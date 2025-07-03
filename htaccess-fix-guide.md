# Руководство по исправлению ошибок .htaccess

## 🚨 Если сайт показывает Internal Server Error 500

### Шаг 1: Проверьте логи Apache
```bash
tail -20 /var/log/apache2/error.log
```

### Шаг 2: Временно отключите .htaccess
```bash
mv .htaccess .htaccess.backup
```
Проверьте сайт. Если заработал - проблема в .htaccess.

### Шаг 3: Используйте минимальную версию
```bash
cp .htaccess-minimal .htaccess
```

### Шаг 4: Если минимальная версия работает
Постепенно добавляйте функции из основного .htaccess:
1. Сначала добавьте сжатие
2. Потом кэширование  
3. Затем заголовки безопасности

## 🔧 Основные исправления в новом .htaccess:

1. **Убрано**: `ServerTokens Prod` - нельзя в .htaccess
2. **Исправлено**: `Order allow,deny` → `Require all denied` (Apache 2.4)
3. **Убрано**: Проблемные `<Directory>` директивы
4. **Добавлено**: Проверки `<IfModule>` для всех модулей
5. **Упрощено**: Заголовки безопасности

## 🛠 Команды для диагностики:

```bash
# Проверка включенных модулей Apache
apache2ctl -M | grep -E "(rewrite|deflate|expires|headers|mime)"

# Проверка синтаксиса .htaccess
apache2ctl configtest

# Перезапуск Apache после изменений
systemctl reload apache2
```

## 📝 Файлы в репозитории:

- `.htaccess` - основная версия (исправленная)
- `.htaccess-minimal` - минимальная версия для экстренных случаев

## ⚡ Быстрое решение на сервере:

```bash
cd /var/www/fastuser/data/www/aitracking.app

# Если сайт не работает:
mv .htaccess .htaccess.old
cp .htaccess-minimal .htaccess

# Проверьте сайт, если работает - используйте основную версию:
cp .htaccess-minimal .htaccess.backup
git pull origin main
``` 