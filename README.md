# code-and-migrations-updater
Code and Migrations updater

1) run "npm install"
2)[OPTIONAL] You can copy "config-dist.js" to "config.js" and replace the values of your needs
3)run node updater.js [..ARGS]

*NOTE*
If you are not using the config file, you should use ARGS as can be one or all of:
 - frontend="path/to/frontend/code"
 - legacy="path/to/legacy/code"
 - hydra="path/to/hydra/code"
 - domain=my.domain.com
 
 *Example*
 node updater.js legacy=C:\www\test1 domain=my.stefkoff.com hydra=C:\www\hydra frontend="D:\frontend"
