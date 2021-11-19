<?php

    $songs = scandir('../assets/musics/');
    chdir('../assets/musics/');
    $all_songs = array();

    $i = 0;
    foreach($songs as $music){
        if($music!='.' && $music!='..' && is_file($music)){
            $all_songs[$i] = $music;
            $i++;
        }
    }

    echo json_encode($all_songs,true);

?>