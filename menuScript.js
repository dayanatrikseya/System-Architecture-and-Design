$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "xml/menu.xml",
        dataType: "xml",
        success: function(xml) {
            // Process the XML file and display its contents on the HTML page
            var output = '';
            $(xml).find('product').each(function() {
                var id = $(this).find('id').text();
                var name = $(this).find('name').text();
                var category = $(this).find('category').text();
                var price = $(this).find('price').text();
                var image = $(this).find('image').text();
                output += '<form action="" method="post" class="box">';
                output += '<input type="hidden" name="pid" value="'+id+'">';
                output += '<input type="hidden" name="name" value="'+name+'">';
                output += '<input type="hidden" name="price" value="'+price+'">';
                output += '<input type="hidden" name="image" value="'+image+'">';
                output += '<a href="quick_view.php?pid='+id+'" class="fas fa-eye"></a>';
                output += '<button type="submit" class="fas fa-shopping-cart" name="add_to_cart"></button>';
                output += '<img src="uploaded_img/'+image+'" alt="">';
                output += '<a href="category.php?category='+category+'" class="cat">'+category+'</a>';
                output += '<div class="name">'+name+'</div>';
                output += '<div class="flex">';
                output += '<div class="price"><span>₱</span>'+price+'</div>';
                output += '<input type="number" name="qty" class="qty" min="1" max="99" value="1" maxlength="2"">';
                output += '</div>';
                output += '</form>';
            });
            output += '';

            $('#xml-content').html(output);
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        }
    });
});