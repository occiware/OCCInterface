
## What is the OCCI playground ?

The OCCI playground is a tool to help you discover, learn and test the OCCI API and manage OCCI resources.  

## And what is OCCI ?

OCCI is a set of specifications which standardize and unify the management of the Cloud. In this standard, everything is a *Resource* or
a *Link*. More informations [here](http://occi-wg.org/about/specification/)

## Getting started

You can explore the API by clicking on the [links](/categories/compute), in the JSON or in this text, or by entering a target URL and clicking on the GET button.

You can post a sample of data by clicking %{
  "text": "here",
  "post": [
    {
        "adress": "/categories/compute",
        "datas": {
          "attributes": {
            "occi.compute.hostname" : "test",
            "occi.compute.state" : "inactive"
          },
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
        }
    },
    {
        "adress": "/categories/storage",
        "datas": {
          "attributes": {
            "occi.storage.size" : 1000
          },
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
        }
    },
    {
      "adress": "/categories/storagelink",
      "datas": {
         "kind":"www.schemas.ogf.org/occi/infrastructure#storagelink",
         "attributes": {
           "occi.core.id":"6df690d2-3158-40c4-88fb-d1c41584d6e7",
           "occi.storagelink.deviceid":"/dev/vdc"
         },
         "target": {
           "location": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
         },
         "source": {
           "location": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
         }
      }
    }
  ]
}%(you need to have occi-infra on your server)

* The first URL you should know is [/-/](/-/).
It gives you the configuration of the OCCI server, list the **actions** you can do, and the **kinds** of resources you can interact with.
You can also discover the **kinds** of the current OCCI server by clicking on "Select Kind" at the top of the page.      

* To access a categorie, use URLs of this type : [/categories/storagelink](/categories/storagelink)  

* Each resource has an unique id. To access a resource, click on a link pointing to it, or use an URL of this type :
[/6df690d2-3158-40c4-88fb-d1c41584d6e5](/6df690d2-3158-40c4-88fb-d1c41584d6e5)<br><br>

Morevover, the use of the four buttons are quite simple :

* GET: make a GET request with the target URL
* EDIT: switch the JSON view to editable, then you can make a POST or PUT to edit or create datas
* DEL: make a DELETE request with the target URL
* M: Go to the kind (the Model) of a resource. You need to have a target URL pointing to a resource.  

### Switching server

You can switch the current OCCI server you are working on with the editable dropdown at the top of the page.
