
============
OCCInterface
============


OCCInterface is a generic application which let you explore and modify the resources of an OCCI server.
Its aims are multiples:
- give a productivity tool to developers calling the OCCI API
- manage and explore resources of an OCCI server easily
- vulgarize, explain OCCI to newcomers, diffuse the OCCI way of thinking


## How to use it 

Requirement :
(some versions bellow should work too but have not been tested) 
- nodeJS: >=6.2.0
- npm: >=3.8.9


``` bash
git clone https://github.com/occiware/OCCInterface.git
```

``` bash
npm install
```

``` bash
npm start
```

You can go to [http://localhost:3000/](http://localhost:3000/).

Then, you need to enter the URL of the OCCI server on the input at the top of the page (without "/" at the end)

## How to integrate it in your own OCCI implementation
TODO

## FAQ for dev

- What is a playground link and how to create it ?  
A playground link is a clickable link that make a GET request on the API and displays its content in the codeview.
To do so, create a classic link in markdown, and make your URL begin with "/"  
example:  
```
[/resources/compute](/resources/compute)
```
- How to deploy on Heroku ?  

``` bash
npm run build
```
``` bash
git commit -am "deployment message"
```
``` bash
git push heroku master
```




## How to configure your Erocci Server
(TODO temporarly here, remove later)

Follow the instructions of [erocci](https://github.com/erocci/erocci/blob/master/doc/README.md)

Then, you need to edit the config/sys.config file.
Find the "backend" section, and modify it that way : 

``` erlang
{backends,
    [
     {root, erocci_backend_mnesia,
      [{schema, "/path/to/config.xml"}],
      <<"/">>}
    ]
   }
```

Copy locally and use [this file](https://github.com/occiware/occi-schemas/blob/master/schemas/http%253A%252F%252Fschemas.ogf.org%252Focci%252Finfrastructure%2523.xml) as the config.xml file.

Then, you can start the server with 

``` bash
./start.sh
```
