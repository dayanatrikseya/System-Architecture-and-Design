<?php
    require 'connect.php';

    // Check connection
    if($connected) {
        echo "Connected Successfully";
    } else {
        die("Connection Failed");
    }

    // Retrieve products from database
    $select_products = $conn->prepare("SELECT * FROM `products`");
    $select_products->execute();

    if($select_products->rowCount() > 0) {
        // Create new XML document
        $xml = new DOMDocument('1.0', 'utf-8');
        $xml->formatOutput = true;

        $dtd = new DOMImplementation();
        $xml->appendChild($dtd->createDocumentType('products', '', 'menu.dtd'));

        // Create root element
        $products = $xml->createElement('products');

        // Iterate over the database results
        while($fetch_products = $select_products->fetch(PDO::FETCH_ASSOC)) {
            // Create product element for each row
            $product = $xml->createElement("product");
            $products->appendChild($product);

            // Pass product id
            $pid = $xml->createElement("id", $fetch_products['id']);
            $product->appendChild($pid);

            // Pass product name
            $pname = $xml->createElement("name", $fetch_products['name']);
            $product->appendChild($pname);

            // Pass product category
            $pcategory = $xml->createElement("category", $fetch_products['category']);
            $product->appendChild($pcategory);

            // Pass product price
            $pprice = $xml->createElement("price", $fetch_products['price']);
            $product->appendChild($pprice);

            // Pass product image
            $pimage = $xml->createElement("image", $fetch_products['image']);
            $product->appendChild($pimage);
        }

        $xml->appendChild($products);

        // Save the updated XML file
        $xml->save($xmlFilePath) or die("Error, Unable to create XML file");

        echo "XML file updated successfully";

        // Validate the updated XML file
        validateXML($xmlFilePath);
    } else {
        echo 'No products found in the database';
    }

    // Validate XML
    function validateXML($xml) {
        try {
            if(file_exists($xml)) {
                $dom = new DOMDocument();
                $dom->load($xml);

                // Perform XML validation
                if($dom->validate()) {
                    echo 'Generated XML file is valid.';
                } else {
                    echo 'Generated XML file is not valid. Check your DTD!';
                }
            } else {
                echo "File does not exist";
            }
        } catch(Exception $e) {
            echo "An error occurred during the process: " . $e->getMessage();
        }
    }

    // Close the database connection
    $conn = null;
?>