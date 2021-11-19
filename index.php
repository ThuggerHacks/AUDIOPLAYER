<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
    <link rel='stylesheet' type='text/css' href='assets/css/style.css'/>
    <title>My Audio Player</title>
</head>
<body>
    <h2 class='title'>MY AUDIO PLAYER </h3>
    <div class='container'>
         <!---------------------volum area----------------------->

        <div class='currentVolume'></div>
        <div class='volume'>
            <span>Volume: </span>
            <input type='range' value=50 max=100 min=0 class='volume-loader'/>
        </div>
        <!----------------------player----------------------->
        <div class='player-container'>
            <div class='player-header'>
                <span class='music-image'>image</span>
                <span class='music-title'>title</span>
            </div>
            <div class='middle'>
                <span class='play-all'>playAll</span>
                <span class='play-shuffle'>shuffle</span>
                <span class='addSong'>&plus;</span>
            </div>
            <div class='player-body'>
                <?php 
                    $songs = scandir(getcwd().'/assets/musics/');
                
                    $index = 0;
                    foreach($songs as $musics):
                        if($musics!='.' && $musics!='..' && !is_dir($musics)):
                ?>
                            <div class='player-music'  onclick='play("<?=$index?>")'>
                                <span class='player-music-icon'>icon</span>
                                <span class='player-music-title' id='song<?=$index?>'><?=substr($musics,0,30)?></span>
                            </div>
                <?php
                            $index++;
                        endif;
                    endforeach;    
                ?>
                        
            </div>
            <div class='player-footer'>
                <div class='player-footer-container'>
                    <span class='player-prev'><<</span>
                    <div class='player-play-pause'>&Delta;</div>
                    <span class='player-next'>>></span>
                    <span class='player-loop'>loop</span>
                    <span class='player-random'>R</span>
                </div>  
                <div class='player-progress-bar'>
                    <div class='player-progress-bar-inner'>
                        <input type='range' value=0 max=100 min=0 class='loader'/>
                    </div>
                </div>  
            </div>
        </div>
        
        <!-----------new song area------------>

        <div class='newSongArea'>
            <input type='file' id='file' />
            <input type='button' value='send' id='send'/>
            <div class='preview'></div>
            <button class='close'>&times;</button>
        </div>
        
    </div>
   
    <script src='assets/js/js.js'></script>
</body>
</html>