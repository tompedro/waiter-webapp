# WAITER APP

For use:
⋅⋅* start docker with docker image "mysql/mysql-server:5.5"
⋅⋅* run these commands
```bash
sudo docker run --name docker-db -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql/mysql-server:5.5
sudo docker exec -it docker-db bash -c "mysql -u root -p'password' -e \"GRANT ALL ON *.* TO root@'%' IDENTIFIED BY 'password';\""
sudo docker exec -it docker-db bash -c "mysql -u root -p'password' -e \"SET PASSWORD = OLD_PASSWORD('password');\""
```
⋅⋅* run npm start in client
⋅⋅* run npm start in api
