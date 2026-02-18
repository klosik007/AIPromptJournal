#!/bin/bash
# Copy nginx configuration
cp /var/www/aipromptjournal/nginx.conf /etc/nginx/sites-available/aipromptjournal
ln -sf /etc/nginx/sites-available/aipromptjournal /etc/nginx/sites-enabled/aipromptjournal
rm -f /etc/nginx/sites-enabled/default

# Test and start nginx
nginx -t
service nginx start