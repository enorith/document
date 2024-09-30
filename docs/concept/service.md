---
title: 服务（service）
---
[[toc]]

## 一个服务的实现
```go
type Config struct {
	Foo string `yaml:"foo" env:"APP_FOO" default:"test"`
}

// Service of database
type Service struct {
	config Config
}

// Register service when app starting, before http server start
// you can configure service, initialize global vars etc.
// running at main goroutine
func (s *Service) Register(app *framework.App) error {
	app.Configure("database", &s.config)
	WithDefaults()
	defaultLogger, _ := logging.DefaultManager.Channel(s.config.LogChannel)

	for name, cc := range s.config.Connections {
		config := cc
		n := name
		gormdb.DefaultManager.Register(n, func() (*gorm.DB, error) {
			dsn := config.DSN
			if n == s.config.Default {
				envDsn := environment.GetString("DB_DSN")
				if envDsn != "" {
					dsn = envDsn
					config.DSN = dsn
				}
			}
			log := defaultLogger
			if lc := config.LogChannel; lc != "" {
				log, _ = logging.DefaultManager.Channel(lc)
				if log == nil {
					log = defaultLogger
				}
			}
			logLevel := logger.Info
			if ll := config.LogLevel; ll != "" {
				var ok bool
				logLevel, ok = logLevelMap[ll]
				if !ok {
					logLevel = logger.Info
				}
			}

			register, ok := GetDriverRegister(config.Driver)
			if !ok {
				return nil, fmt.Errorf("unregistered database driver [%s]", config.Driver)
			}
			conf := &gorm.Config{}
			if defaultLogger != nil {
				conf.Logger = &Logger{
					logLevel:      logLevel,
					logger:        log,
					SlowThreshold: 300 * time.Millisecond,
					withMigration: s.config.WithMigrationLog,
				}
			}
			conf.DisableForeignKeyConstraintWhenMigrating = !s.config.WithForeignKey
			tx, e := gorm.Open(register(dsn), conf)
			if e != nil {
				return nil, e
			}
			db, e := tx.DB()
			if e != nil {
				return nil, e
			}
			db.SetMaxIdleConns(MaxIdelConns)
			db.SetMaxOpenConns(MaxOpenConns)
			db.SetConnMaxIdleTime(MaxIdleTime)
			db.SetConnMaxLifetime(MaxLifeTime)
			return tx, e
		})
	}

	gormdb.DefaultManager.Using(s.config.Default)

	if s.config.AuthMigrate && Migrator != nil {
		if tx, e := gormdb.DefaultManager.GetConnection(); e == nil {
			Migrator(tx)
		} else if defaultLogger != nil {
			defaultLogger.Error("[database] migration error %v")
		}
	}

	app.Bind(func(ioc container.Interface) {
		ioc.BindFunc(&gorm.DB{}, func(c container.Interface) (interface{}, error) {
			return gormdb.DefaultManager.GetConnection()
		}, false)
	})

	return nil
}
```