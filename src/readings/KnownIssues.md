## Known issues

### Deleting storage link

* You need to have occi-infra on your server. The following link will post a compute resource, a storage and a linkstorage: %{
  "text": "click",
  "post": [
    {
        "address": "/compute",
        "datas": {
         "kind":"http://schemas.ogf.org/occi/infrastructure#compute",
          "attributes": {
            "occi.compute.hostname" : "test",
            "occi.compute.state" : "inactive"
          },
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
        }
    },
    {
        "address": "/storage",
        "datas": {
         "kind":"http://schemas.ogf.org/occi/infrastructure#storage",
          "attributes": {
            "occi.storage.size" : 1000
          },
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
        }
    },
    {
      "address": "/storagelink",
      "datas": {
         "kind":"http://schemas.ogf.org/occi/infrastructure#storagelink",
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
}%


* You can then check if this resources has been created : [/compute](/compute), [/storage](/storage), [/storagelink](/storagelink).    

* Now delete the storagelink by clicking %{
  "text": "here",
  "del": "/6df690d2-3158-40c4-88fb-d1c41584d6e7"
}%    

* Try again to access [/compute](/compute) or [/storage](/storage).    
