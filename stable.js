play_music = true;
hand = {
    empty: 'empty',
    shovel: 'shovel',
    fork: 'fork',
    fork_filled: 'fork_filled',
    brush: 'brush',
    small_brush: 'small_brush',
    hoofpick: 'hoofpick',
    apple: 'apple',
    grain_scoop: 'grain_scoop'
}
handcurrent = hand.empty;
waterfilled = false;
foodfilled = false;
hoofpicklevel = 0
brushlevel = 0
strawclean = false
done = false;

shovel_held_sprite = null
fork_held_sprite = null
grain_held_sprite = null
brush_held_sprite = null
hoofpick_held_sprite = null
apple_held_sprite = null

class Example extends Phaser.Scene
{

    preload ()
    {
        this.load.image('stable', './images/stable/stable-bg.png');

        this.load.atlas('shovel', './images/stable/shovel.png', './images/stable/shovel.json');
        this.load.image('shovel_held', './images/stable/shovel_held.png');
        this.load.atlas('fork', './images/stable/fork.png', './images/stable/fork.json');
        this.load.spritesheet('fork_held', './images/stable/fork_held.png', { frameWidth: 157, frameHeight: 167 });
        this.load.spritesheet('straw1', './images/stable/straw1.png', { frameWidth: 216, frameHeight: 143 });
        this.load.spritesheet('straw2', './images/stable/straw2.png', { frameWidth: 180, frameHeight: 126 });
        this.load.spritesheet('straw3', './images/stable/straw3.png', { frameWidth: 236, frameHeight: 150 });
        this.load.image('straw_bales', './images/stable/straw_bales.png');

        this.load.atlas('trough', './images/stable/trough.png', './images/stable/trough.json');
        this.load.atlas('food_trough', './images/stable/food.png', './images/stable/food.json');
        this.load.image('grain_bin', './images/stable/grain_bin.png');
        this.load.image('grain_scoop', './images/stable/grain_scoop.png');
        this.load.image('apple_bin', './images/stable/apples.png');
        this.load.image('apple_held', './images/stable/apple.png');
        
        this.load.image('brush_held', './images/stable/brush_held.png');
        this.load.atlas('brush', './images/stable/brush.png', './images/stable/brush.json');
        this.load.image('hoofpick_held', './images/stable/hoofpick_held.png');
        this.load.atlas('hoofpick', './images/stable/hoofpick.png', './images/stable/hoofpick.json');
        this.load.spritesheet('hooves', './images/stable/hooves.png', { frameWidth: 45, frameHeight: 45 });
        this.load.atlas('horse', './images/stable/horse.png', './images/stable/horse.json');

        this.load.spritesheet('music_button', './images/stable/music.png', { frameWidth: 36, frameHeight: 36 });

        this.load.audio('background_music', ['./sounds/stable_soundtrack.mp3']);
        this.load.audio('shovel_sound', ['./sounds/shovel_sound.mp3']);
        this.load.audio('fork_sound', ['./sounds/fork_fill.mp3']);
        this.load.audio('fork_sound2', ['./sounds/fork_place.mp3']);
        this.load.audio('grain_sound', ['./sounds/grain_fill.mp3']);
        this.load.audio('grain_sound2', ['./sounds/grain_place.mp3']);
        this.load.audio('water_sound', ['./sounds/water_sound.mp3']);
        this.load.audio('hoofpick_sound', ['./sounds/hoof_scrape.mp3']);
        this.load.audio('apple_sound', ['./sounds/apple_munch.mp3']);
        this.load.audio('brush_sound', ['./sounds/brush_sound.mp3']);
    }

    create ()
    {
        const backgroundMusic = this.sound.add('background_music');
        backgroundMusic.loop = true; 
        backgroundMusic.play();

        this.add.image(427, 251, 'stable');
        const music_button = this.add.sprite(832, 480, 'music_button', 0).setInteractive({ pixelPerfect: true });

        // note: pixel perfect appears to have a bug that causes it to include pixels from other frames 
        // i.e. the spritesheet has multiple frames and a click is counted if it falls on where the second 
        // frame would be if the entire image were visible, even if only the first frame is visible
        const straw2 = this.add.sprite(481, 387, 'straw2', 0).setInteractive();
        const straw1 = this.add.sprite(315, 380, 'straw1', 0).setInteractive();
        const straw3 = this.add.sprite(632, 376, 'straw3', 0).setInteractive();
        const straw_bales = this.add.sprite(333, 45, 'straw_bales', 0).setInteractive();

        const fork = this.add.sprite(735, 240, 'fork', 0).setInteractive({ pixelPerfect: true });
        const shovel = this.add.sprite(759, 272, 'shovel', 0).setInteractive({ pixelPerfect: true });
        const apple_bin = this.add.image(649, 454, 'apple_bin').setInteractive();
        const grain_bin = this.add.image(733, 415, 'grain_bin').setInteractive({ pixelPerfect: true });
        const food_trough = this.add.sprite(139, 236, 'food_trough', 0).setInteractive({ pixelPerfect: true });
        const brush = this.add.sprite(739, 110, 'brush', 0).setInteractive({ pixelPerfect: true });
        const hoofpick = this.add.sprite(781, 99, 'hoofpick', 0).setInteractive({ pixelPerfect: true });

        // trough
        const trough = this.add.sprite(181, 418, 'trough', 0).setInteractive({ pixelPerfect: true });
        this.anims.create({
            key: 'fill_water',
            frames: this.anims.generateFrameNumbers('trough', { frames: [ 1, 2, 3 ] }),
            frameRate: 4
        });

        // horse
        const horse = this.add.sprite(370, 220, 'horse', 0).setInteractive({ pixelPerfect: true });
        this.anims.create({
            key: 'drink_water',
            frames: this.anims.generateFrameNumbers('horse', { frames: [ 0, 1, 0 ] }),
            frameRate: 1,
            delay: 0
        });
        this.anims.create({
            key: 'rear',
            frames: this.anims.generateFrameNumbers('horse', { frames: [ 0, 2, 0 ] }),
            frameRate: 1,
            delay: 0
        });

        const hooves1 = this.add.sprite(305, 427, 'hooves', 0).setInteractive().setVisible(false);
        const hooves2 = this.add.sprite(510, 427, 'hooves', 0).setInteractive().setVisible(false);


        // held items
        fork_held_sprite = this.add.image(735, 240, 'fork_held').setVisible(false);
        shovel_held_sprite = this.add.image(759, 272, 'shovel_held').setVisible(false);
        grain_held_sprite = this.add.image(759, 272, 'grain_scoop').setVisible(false);
        brush_held_sprite = this.add.image(759, 272, 'brush_held').setVisible(false);
        hoofpick_held_sprite = this.add.image(759, 272, 'hoofpick_held').setVisible(false);
        apple_held_sprite = this.add.image(759, 272, 'apple_held').setVisible(false);

        const shovel_sound = this.sound.add('shovel_sound');
        const fork_sound = this.sound.add('fork_sound');
        const fork_sound2 = this.sound.add('fork_sound2');
        const grain_sound = this.sound.add('grain_sound');
        const grain_sound2 = this.sound.add('grain_sound2');
        const water_sound = this.sound.add('water_sound');
        const hoofpick_sound = this.sound.add('hoofpick_sound');
        const apple_sound = this.sound.add('apple_sound');
        const brush_sound = this.sound.add('brush_sound');
        
        this.input.topOnly = true; // don't allow objects to be interacted with when they are lower

        // mute button
        music_button.on('pointerdown', function (pointer)
        {
            if (play_music) {
                backgroundMusic.stop()
                this.setFrame(1)
            }
            else {
                backgroundMusic.play()
                this.setFrame(0)
            }
            play_music = !play_music
        });
        
        // pick up and return items
        function set_tool(tool, sprite) {
            if (handcurrent === hand.empty) {
                handcurrent = tool;
                sprite.setFrame(1)
            }
            else if (handcurrent === tool) {
                handcurrent = hand.empty;
                sprite.setFrame(0)
            }
        }
        shovel.on('pointerdown', function (pointer)
        {
            set_tool(hand.shovel, shovel)
        });
        fork.on('pointerdown', function (pointer)
        {
            if (handcurrent === hand.empty) {
                handcurrent = hand.fork;
                this.setFrame(1)
            }
            else if (handcurrent === hand.fork || handcurrent === hand.fork_filled) {
                handcurrent = hand.empty;
                this.setFrame(0)
            }
        });
        grain_bin.on('pointerdown', function (pointer)
        {
            if (!foodfilled && handcurrent === hand.empty) {
                handcurrent = hand.grain_scoop
                grain_bin.setVisible(false)
                grain_sound.play()
            }
        });
        apple_bin.on('pointerdown', function (pointer)
        {
            if (handcurrent === hand.empty) {
                handcurrent = hand.apple;
            }
        });
        brush.on('pointerdown', function (pointer)
        {
            set_tool(hand.brush, brush)
        });
        hoofpick.on('pointerdown', function (pointer)
        {
            set_tool(hand.hoofpick, hoofpick)
            hooves1.setVisible(handcurrent === hand.hoofpick)
            hooves2.setVisible(handcurrent === hand.hoofpick)
        });

        // pick up dirty straw and place clean straw
        function clean_straw(straw) {
            if (handcurrent === hand.shovel && straw.frame.name === 0) {
                straw.setFrame(1);
                shovel_sound.play();
            }
            else if (handcurrent === hand.fork_filled && straw.frame.name === 1) {
                straw.setFrame(2);
                handcurrent = hand.fork
                fork_sound2.play()
                strawclean = 2 === straw1.frame.name && 2 === straw2.frame.name && 2 === straw3.frame.name
                checkDone()
            }
        }
        straw1.on('pointerdown', function (pointer) {clean_straw(straw1)});
        straw2.on('pointerdown', function (pointer) {clean_straw(straw2)});
        straw3.on('pointerdown', function (pointer) {clean_straw(straw3)});

        straw_bales.on('pointerdown', function (pointer)
        {
            if (handcurrent === hand.fork) {
                handcurrent = hand.fork_filled
                fork_sound.play()
            }
        });

        // place food
        food_trough.on('pointerdown', function (pointer)
        {
            if (!foodfilled && handcurrent === hand.grain_scoop) {
                handcurrent = hand.empty;
                foodfilled = true;
                grain_bin.setVisible(true);
                this.setFrame(1);
                grain_sound2.play()
                checkDone()
            }
        });

        // fill water
        trough.on('pointerdown', function (pointer)
        {
            if (!waterfilled && handcurrent === hand.empty) {
                waterfilled = true;
                this.play('fill_water');
                horse.play('drink_water');
                water_sound.play()
                checkDone()
            }
        });

        // clean hooves
        function clean_hooves(sprite) {
            if (sprite.frame.name <2 && handcurrent === hand.hoofpick) {
                sprite.setFrame(sprite.frame.name + 1)
                hoofpick_sound.play()
            }
            hoofpicklevel = hooves1.frame.name + hooves2.frame.name
            checkDone()
        }
        hooves1.on('pointerdown', function (pointer) { clean_hooves(hooves1) });
        hooves2.on('pointerdown', function (pointer) { clean_hooves(hooves2) });

        // interact with horse
        horse.on('pointerdown', function (pointer)
        {
            if (handcurrent === hand.apple) {
                handcurrent = hand.empty;
                apple_sound.play();
            }
            else if (handcurrent === hand.brush) {
                brush_sound.play();
                if (brushlevel < 2) {
                    brushlevel += 1;
                }
                else if (brushlevel === 2) {
                    horse.play('rear');
                }
                checkDone()
            }
        });

        // This makes the horse rear once fully fed/clean/happy
        // It should be removed once the progress bars are added
        function checkDone() {
            if (!done && waterfilled && foodfilled && hoofpicklevel === 4 && brushlevel === 2 && strawclean) {
                horse.play('rear');
                done = true;
            }
        }
    }

    update ()
    {
        const pointer = this.input.activePointer;
            
        // clear held items from display
        function clearCursor() {
            shovel_held_sprite.setVisible(false);
            fork_held_sprite.setVisible(false);
            grain_held_sprite.setVisible(false);
            brush_held_sprite.setVisible(false);
            hoofpick_held_sprite.setVisible(false);
            apple_held_sprite.setVisible(false);
        }

        // display held items under cursor
        if (handcurrent === hand.shovel) {
            clearCursor()
            shovel_held_sprite.setVisible(true).setPosition(pointer.worldX+15, pointer.worldY-30);
        }
        else if (handcurrent === hand.fork) {
            clearCursor()
            fork_held_sprite.setFrame(0).setVisible(true).setPosition(pointer.worldX+20, pointer.worldY-20);
        }
        else if (handcurrent === hand.fork_filled) {
            clearCursor()
            fork_held_sprite.setFrame(1).setVisible(true).setPosition(pointer.worldX+20, pointer.worldY-20);
        }
        else if (handcurrent === hand.grain_scoop) {
            clearCursor()
            grain_held_sprite.setVisible(true).setPosition(pointer.worldX, pointer.worldY);
        }
        else if (handcurrent === hand.brush) {
            clearCursor()
            brush_held_sprite.setVisible(true).setPosition(pointer.worldX, pointer.worldY);
        }
        else if (handcurrent === hand.hoofpick) {
            clearCursor()
            hoofpick_held_sprite.setVisible(true).setPosition(pointer.worldX, pointer.worldY);
        }
        else if (handcurrent === hand.apple) {
            clearCursor()
            apple_held_sprite.setVisible(true).setPosition(pointer.worldX, pointer.worldY);
        }
        else {
            clearCursor()
        }
    }
}