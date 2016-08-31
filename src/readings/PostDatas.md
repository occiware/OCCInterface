### Post on blog schema

* Here is a simple POST which should create a blog entry (you can test on malmo.lizenn) %{
  "text": "post",
  "label": "postBlog",
  "post":
    {
        "adress": "/categories/blog",
        "datas": {
          "kind":"example.org/occi/test#blog",
          "id": "6df690d2-3158-40c4-88fb-d1c41584d6e5"
        }
    }
}%

* Now let's try to get the root of the application [/-/](/-/)
* You can get the entry you posted before by clicking [here](/6df690d2-3158-40c4-88fb-d1c41584d6e5)
* Finally, you can delete it by clicking %{
  "text": "here",
  "label": "deleteBlog",
  "del": "/6df690d2-3158-40c4-88fb-d1c41584d6e5"
}%
