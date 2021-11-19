<?php
    
    if(isset($_FILES['file'])){

        $file = $_FILES['file'];
        move_uploaded_file($file['tmp_name'],'../assets/musics/'.$file['name']);

        echo json_encode($file);
    }
    