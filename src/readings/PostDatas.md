### Post on malmo

* Here is a simple POST which should create a blog entry (you can test on malmo.lizenn) %{
  "label": "post",
  "post":
    {
        "adress": "/categories/blog",
        "datas": {
          "kind":"example.org/occi/test#blog"
        }
    },
  "del": "/6df690d2-3158-40c4-88fb-d1c41584d6e7"
}%
