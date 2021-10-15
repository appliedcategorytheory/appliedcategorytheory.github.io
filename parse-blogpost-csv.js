$.ajax({
  type: "GET",
  url: "assets/ACT School Blog posts.csv",
  dataType: "text",
  success: function(data) {
    var blog_post_data = Papa.parse(data);
    displayHTMLlist(blog_post_data);
    // displayHTMLTable(blog_post_data);
  },
  error: function (request, status, error) {
    alert("Could not load blogposts!");
  }
});

function displayHTMLlist(results){
  var list = "<ul>";
  var data = results.data;

  for(var i = data.length - 1; i > 0; i--){
    // date, mentor, students, title, url
    var date = data[i][0];
    var mentor = data[i][1];
    var students = data[i][2];
    var title = data[i][3];
    var url = data[i][4];
    var entry = `<li>[${date}] ${students}. <a href="${url}">${title}</a>. Mentored by <i>${mentor}</i>.</li>`;
    list += entry
  }
  list += "</ul>";
  $("#blogposts").html(list);
}

function displayHTMLTable(results){
  var table = "<table class='table'>";
  var data = results.data;

  for(i=1;i<data.length;i++){
    table+= "<tr>";
    var row = data[i];

    for(j=0;j<row.length;j++){
      table+= "<td>";
      table+= row[j];
      table+= "</th>";
    }
    table+= "</tr>";
  }
  table+= "</table>";
  $("#blogposts").html(table);
}
