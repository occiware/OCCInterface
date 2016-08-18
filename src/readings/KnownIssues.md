## Known issues

Here is a simple POST which should create a blog entry (test on malmo.lizenn) %{
  "label": "post",
  "post":
    {
        "adress": "/categories/blog",
        "datas": {
          "kind":"example.org/occi/test#blog"
        }
    }
}%

Now with occi-infra.xml, th following link will post a compute resource, a storage and a linkstorage. %{
  "label": "Test it",
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
            {
              "attributes": {
                "occi.storage.size" : 1000
              },
              "id": "6df690d2-3158-40c4-88fb-d1c41584d6e6"
            }
        }
    }
  ]
}%
