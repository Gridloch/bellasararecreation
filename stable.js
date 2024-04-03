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
    constructor ()
    {
        super({
            pack: {
                files: [
                    { type: 'scenePlugin', key: 'SpinePlugin', url: './SpinePluginDebug.js', sceneKey: 'spine' }
                ]
            }
        });
    }

    preload ()
    {
        this.load.image('stable_bg', './images/stable/stable-bg.png');
        this.load.image('stable_fg', './images/stable/stable-fg.png');
        this.load.image('hunger_scale', './images/stable/hunger.png');
        this.load.image('cleanliness_scale', './images/stable/cleanliness.png');
        this.load.image('happiness_scale', './images/stable/happiness.png');

        this.load.atlas('shovel', './images/stable/shovel.png', './images/stable/shovel.json');
        this.load.image('shovel_held', './images/stable/shovel_held.png');
        this.load.atlas('fork', './images/stable/fork.png', './images/stable/fork.json');
        this.load.spritesheet('fork_held', './images/stable/fork_held.png', { frameWidth: 157, frameHeight: 167 });
        this.load.spritesheet('straw1', './images/stable/straw1.png', { frameWidth: 216, frameHeight: 143 });
        this.load.spritesheet('straw2', './images/stable/straw2.png', { frameWidth: 180, frameHeight: 126 });
        this.load.spritesheet('straw3', './images/stable/straw3.png', { frameWidth: 236, frameHeight: 150 });
        this.load.image('straw_bales', './images/stable/straw_bales.png');

        this.load.atlas('trough', './images/stable/water.png', './images/stable/water.json');
        this.load.atlas('food_trough', './images/stable/food.png', './images/stable/food.json');
        this.load.atlas('grain_bin', './images/stable/grain_bin.png', './images/stable/grain_bin.json');
        this.load.image('grain_scoop', './images/stable/grain_scoop.png');
        this.load.atlas('apple_bin', './images/stable/apples.png','./images/stable/apples.json');
        this.load.image('apple_held', './images/stable/apple.png');
        
        this.load.image('brush_held', './images/stable/brush_held.png');
        this.load.atlas('brush', './images/stable/brush.png', './images/stable/brush.json');
        this.load.image('hoofpick_held', './images/stable/hoofpick_held.png');
        this.load.atlas('hoofpick', './images/stable/hoofpick.png', './images/stable/hoofpick.json');
        this.load.spritesheet('hooves', './images/stable/hooves.png', { frameWidth: 45, frameHeight: 45 });

        this.load.spine('horse', './images/horse/horse.json', ['./images/horse/peter.atlas'], true);

        this.load.atlas('luck', './images/stable/luck.png', './images/stable/luck.json');

        this.load.spritesheet('music_button', './images/stable/music.png', { frameWidth: 36, frameHeight: 36 });
        this.load.atlas('help_button', './images/stable/help.png', './images/stable/help.json');

        this.load.audio('background_music', ['./sounds/stable_soundtrack.mp3']);
        this.load.audio('shovel_sound', ['./sounds/shovel_sound.mp3']);
        this.load.audio('fork_sound', ['./sounds/fork_fill.mp3']);
        this.load.audio('fork_grain_place', ['./sounds/fork+grain_place.mp3']);
        this.load.audio('grain_sound', ['./sounds/grain_fill.mp3']);
        this.load.audio('water_sound', ['./sounds/water_sound.mp3']);
        this.load.audio('hoofpick_sound', ['./sounds/hoof_scrape.mp3']);
        this.load.audio('apple_sound', ['./sounds/apple_munch.mp3']);
        this.load.audio('brush_sound', ['./sounds/brush_sound.mp3']);
        this.load.audio('luck_sound', ['./sounds/luck_sound.mp3']);
    }

    create ()
    {
        //  If you disable topOnly it will fire events for all objects the pointer is over, regardless of place on the display list
        this.input.topOnly = false;

        const backgroundMusic = this.sound.add('background_music');
        backgroundMusic.loop = true; 
        backgroundMusic.play();

        this.add.image(444, 261, 'stable_bg');

        const straw2 = this.add.sprite(481, 387, 'straw2', 0).setInteractive();
        const straw1 = this.add.sprite(315, 380, 'straw1', 0).setInteractive();
        const straw3 = this.add.sprite(632, 376, 'straw3', 0).setInteractive();
        const straw_bales = this.add.sprite(333, 45, 'straw_bales', 0).setInteractive();


        // Water Trough
        const trough = this.add.sprite(153, 455, 'trough', 'idle0000').setInteractive({ pixelPerfect: true });
        const water_sound = this.sound.add('water_sound');
            this.anims.create({
                key: 'fill_water',
                frames: this.anims.generateFrameNumbers('trough', { frames: [
                    'water0011', 'water0011', 'water0011',
                    'water0014', 'water0014',
                    'water0016', 'water0016',
                    'water0018', 'water0019', 'water0020', 'water0021', 'water0022', 'water0023', 'water0024', 'water0025', 'water0025',
                    'water0027', 'water0028', 'water0029', 'water0030', 'water0031', 'water0032', 'water0033', 'water0034', 'water0035',
                    'water0036', 'water0037', 'water0038', 'water0039', 'water0040', 'water0041', 'water0042', 'water0043', 'water0044',
                    'water0045', 'water0046', 'water0047', 'water0048', 'water0049', 'water0050', 'water0051', 'water0052', 'water0053',
                    'water0054', 'water0055', 'water0056', 'water0057', 'water0058', 'water0059', 'water0060',
                    'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060',
                    'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060',
                    'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060', 'water0060',
                    'water0092', 'water0093', 'water0094', 'water0095', 'water0096', 'water0097', 'water0098', 'water0099', 'water0100',
                    'water0101', 'water0102', 'water0103', 'water0104', 'water0105', 'water0106', 'water0107', 'water0108', 'water0109', 'water0110',
                    'water0111', 'water0112', 'water0113', 'water0114', 'water0115', 'water0116', 'water0117', 'water0118', 'water0119', 'water0120',
                    'water0121', 'water0121', 'water0122', 'water0123', 'water0124', 'water0125', 'water0126'
                ] }),
                frameRate: 24
            });
            trough.on('pointerdown', function (pointer)
            {
                if (!waterfilled && handcurrent === hand.empty) {
                    waterfilled = true;
                    this.play('fill_water');
                    water_sound.play()
                    updateBar(hungerBar, 1.5)
                    horse.play('drink')
                }
            });
            trough.on('pointerover', function (pointer)
            {
                if (!waterfilled && handcurrent === hand.empty) {
                    this.setFrame('hover0004');
                }
            });
            trough.on('pointerout', function (pointer)
            {
                if (!waterfilled && handcurrent === hand.empty) {
                    this.setFrame('idle0000');
                }
            });

        // Food Trough
        const food_trough = this.add.sprite(104, 303, 'food_trough', 0).setInteractive({ pixelPerfect: true });
            this.anims.create({
                key: 'fill',
                frames: this.anims.generateFrameNumbers('food_trough', { frames: [
                    'empty',
                    'fill0000', 'fill0001', 'fill0002', 'fill0003', 'fill0004', 'fill0005', 'fill0006', 'fill0007', 'fill0008', 'fill0009', 'fill0010',
                    'full'
                ] }),
                frameRate: 24
            });
            this.anims.create({
                key: 'fill_again',
                frames: this.anims.generateFrameNumbers('food_trough', { frames: [
                    'full',
                    'fill_again0000', 'fill_again0001', 'fill_again0002', 'fill_again0003', 'fill_again0004', 'fill_again0004', 'fill_again0004', 'fill_again0004', 'fill_again0004', 'fill_again0009', 'fill_again0010',
                    'full'
                ] }),
                frameRate: 24
            });
            food_trough.on('pointerdown', function (pointer)
            {
                if (handcurrent === hand.grain_scoop) {
                    handcurrent = hand.empty;
                    grain_bin.play('place');
                    this.play(foodfilled ? 'fill_again' : 'fill')
                    fork_grain_place_sound.play()
                    if (!foodfilled) {
                        updateBar(hungerBar, 2)
                        updateBar(happinessBar, 1.05)
                    }
                    foodfilled = true;
                }
            });

        // horse
        const horse = this.add.spine(453, 283, 'horse', 'idle').setAngle(90);

        const graphics = this.add.graphics()
        const horse_interactive = graphics.setInteractive(new Phaser.Geom.Rectangle(230, 100, 356, 256), Phaser.Geom.Rectangle.Contains);

        const hooves1 = this.add.sprite(305, 427, 'hooves', 0).setInteractive().setVisible(false);
        const hooves2 = this.add.sprite(510, 427, 'hooves', 0).setInteractive().setVisible(false);


        // Pitchfork
        const fork = this.add.sprite(718, 177, 'fork', 'idle').setInteractive({ pixelPerfect: true });
            fork.on('pointerover', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    if (straw1.frame.name === 1 || straw2.frame.name === 1 || straw3.frame.name === 1) {
                        this.setFrame('hover_use');
                    }
                    else {
                        this.setFrame('hover_wait');
                    }
                }
            });
            fork.on('pointerout', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    this.setFrame('idle');
                }
            });
            fork.on('pointerdown', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    handcurrent = hand.fork;
                    this.setFrame('in_use')
                }
                else if (handcurrent === hand.fork || handcurrent === hand.fork_filled) {
                    handcurrent = hand.empty;
                    this.setFrame('idle')
                }
            });

        // Shovel
        const shovel = this.add.sprite(742, 189, 'shovel', 'idle').setInteractive({ pixelPerfect: true });
            shovel.on('pointerover', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    if (straw1.frame.name === 1 || straw2.frame.name === 1 || straw3.frame.name === 1) {
                        this.setFrame('hover_done');
                    }
                    else {
                        this.setFrame('hover_use');
                    }
                }
            });
            shovel.on('pointerout', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    this.setFrame('idle');
                }
            });
            shovel.on('pointerdown', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    handcurrent = hand.shovel;
                    shovel.setFrame('in_use')
                }
                else if (handcurrent === hand.shovel) {
                    handcurrent = hand.empty;
                    shovel.setFrame('idle')
                }
            });


        // Apple Bin
        const apple_bin = this.add.image(680, 505, 'apple_bin', 'apple_bin').setInteractive();
            apple_bin.on('pointerdown', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    handcurrent = hand.apple;
                    apple_bin.setFrame('apple_bin')
                }
            });
            apple_bin.on('pointerover', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    apple_bin.setFrame('apple_bin_hover')
                }
            });
            apple_bin.on('pointerout', function (pointer)
            {
                apple_bin.setFrame('apple_bin')
            });
        
        // Grain Bin
        const grain_bin = this.add.sprite(736, 413, 'grain_bin', 'idle').setInteractive({ pixelPerfect: true });
        const grain_sound = this.sound.add('grain_sound');
            this.anims.create({
                key: 'pickup',
                frames: this.anims.generateFrameNumbers('grain_bin', { frames: [
                    'idle',
                    'pickup0000', 'pickup0001', 'pickup0002', 'pickup0003', 'pickup0004', 'pickup0005', 'pickup0006', 'pickup0007', 'pickup0008', 'pickup0009', 'pickup0010',
                    'pickup0011', 'pickup0012', 'pickup0013', 'pickup0013', 'pickup0015', 'pickup0016', 'pickup0017',
                    'empty'
                ] }),
                frameRate: 24
            });
            this.anims.create({
                key: 'place',
                frames: this.anims.generateFrameNumbers('grain_bin', { frames: [
                    'empty',
                    'place0000', 'place0001', 'place0002', 'place0003', 'place0004', 'place0005', 'place0006', 'place0007',
                    'idle'
                ] }),
                frameRate: 24
            });
            grain_bin.on('pointerdown', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    handcurrent = hand.grain_scoop
                    grain_bin.play('pickup')
                    grain_sound.play()
                }
            });
            grain_bin.on('pointerover', function (pointer)
            {
                if (handcurrent === hand.empty) {
                    grain_bin.setFrame('hover')
                }
            });
            grain_bin.on('pointerout', function (pointer)
            {
                if (handcurrent === hand.grain_scoop) {
                    grain_bin.setFrame('empty')
                }
                else {
                    grain_bin.setFrame('idle')
                }
            });


        const brush = this.add.sprite(739, 110, 'brush', 0).setInteractive({ pixelPerfect: true });
        const hoofpick = this.add.sprite(781, 99, 'hoofpick', 0).setInteractive({ pixelPerfect: true });


        // held items
        fork_held_sprite = this.add.sprite(735, 240, 'fork').setVisible(false);
            this.anims.create({
                key: 'fork_fill',
                frames: this.anims.generateFrameNumbers('fork', { frames: [
                    'fill0000', 'fill0001', 'fill0002', 'fill0003', 'fill0004', 'fill0005', 'fill0006', 'fill0007', 'held_filled'
                ] }),
                frameRate: 24
            });
            this.anims.create({
                key: 'fork_pickup',
                frames: this.anims.generateFrameNumbers('fork', { frames: [
                    'hold0000', 'hold0001', 'hold0002', 'hold0003', 'hold0004', 'hold0005', 'hold0006', 'hold0007', 'held_empty'
                ] }),
                frameRate: 24
            });
            this.anims.create({
                key: 'fork_place',
                frames: this.anims.generateFrameNumbers('fork', { frames: [
                    'place0000', 'place0001', 'place0002', 'place0003', 'place0004', 'place0005', 'held_empty'
                ] }),
                frameRate: 24
            });

        shovel_held_sprite = this.add.sprite(759, 272, 'shovel').setVisible(false);
            this.anims.create({
                key: 'shovel_pickup',
                frames: this.anims.generateFrameNumbers('shovel', { frames: [
                    'hold0000', 'hold0001', 'held'
                ] }),
                frameRate: 24
            });
            this.anims.create({
                key: 'shovel_scoop',
                frames: this.anims.generateFrameNumbers('shovel', { frames: [
                    'held',
                    'scoop0000', 'scoop0001', 'scoop0002', 'scoop0003', 'scoop0004', 'scoop0005', 'scoop0006', 'scoop0007', 'scoop0008', 'scoop0009',
                    'scoop0010', 'scoop0011', 'scoop0012',
                    'held'
                ] }),
                frameRate: 24
            });

        grain_held_sprite = this.add.image(759, 272, 'grain_scoop').setVisible(false);
        brush_held_sprite = this.add.image(759, 272, 'brush_held').setVisible(false);
        hoofpick_held_sprite = this.add.image(759, 272, 'hoofpick_held').setVisible(false);
        apple_held_sprite = this.add.image(759, 272, 'apple_held').setVisible(false);

        const shovel_sound = this.sound.add('shovel_sound');
        const fork_sound = this.sound.add('fork_sound');
        const fork_grain_place_sound = this.sound.add('fork_grain_place');
        const hoofpick_sound = this.sound.add('hoofpick_sound');
        const apple_sound = this.sound.add('apple_sound');
        const brush_sound = this.sound.add('brush_sound');
        
        this.input.topOnly = true; // don't allow objects to be interacted with when they are lower
        
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
                shovel_held_sprite.play('shovel_scoop');
                updateBar(cleanlinessBar, 1/3)
                updateBar(happinessBar, 1/6 + 0.05)
            }
            else if (handcurrent === hand.fork_filled && straw.frame.name === 1) {
                straw.setFrame(2);
                handcurrent = hand.fork
                fork_grain_place_sound.play()
                strawclean = 2 === straw1.frame.name && 2 === straw2.frame.name && 2 === straw3.frame.name
                updateBar(cleanlinessBar, 1/3)
                updateBar(happinessBar, 1/6 + 0.05)
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

        // clean hooves
        function clean_hooves(sprite) {
            if (sprite.frame.name <2 && handcurrent === hand.hoofpick) {
                sprite.setFrame(sprite.frame.name + 1)
                hoofpick_sound.play()
                updateBar(cleanlinessBar, 0.25)
                updateBar(happinessBar, 1/8)
            }
        }
        hooves1.on('pointerdown', function (pointer) { clean_hooves(hooves1) });
        hooves2.on('pointerdown', function (pointer) { clean_hooves(hooves2) });

        // interact with horse
        horse_interactive.on('pointerdown', function (pointer)
        {
            if (handcurrent === hand.apple) {
                handcurrent = hand.empty;
                apple_sound.play();
            }
            else if (handcurrent === hand.brush) {
                brush_sound.play();
                if (brushlevel < 2) {
                    brushlevel += 1;
                    updateBar(cleanlinessBar, 1/3)
                    updateBar(happinessBar, 1/6)
                }
                else if (brushlevel === 2) {
                    brushlevel += 1;
                    horse.play('rear');
                    updateBar(cleanlinessBar, 1/3)
                    updateBar(happinessBar, 1/6)
                }
            }
        });


        // Lucky Horseshoe
        const luck = this.add.sprite(453, 268, 'luck', 'idle').setInteractive({ pixelPerfect: true });
        const luck_sound = this.sound.add('luck_sound');
        this.anims.create({
            key: 'good_luck',
            frames: this.anims.generateFrameNumbers('luck', { frames: [
                'idle',
                'good_luck0000', 'good_luck0001', 'good_luck0002', 'good_luck0003', 'good_luck0004', 'good_luck0005', 'good_luck0006', 'good_luck0007', 'good_luck0008', 'good_luck0009',
                'good_luck0010', 'good_luck0011', 'good_luck0012', 'good_luck0013', 'good_luck0014', 'good_luck0015', 'good_luck0016', 'good_luck0017', 'good_luck0018', 'good_luck0019',
                'good_luck0020', 'good_luck0021', 'good_luck0022', 'good_luck0023', 'good_luck0024', 'good_luck0025', 'good_luck0026', 'good_luck0027', 'good_luck0028', 'good_luck0029',
                'good_luck0030', 'good_luck0031', 'good_luck0032', 'good_luck0033', 'good_luck0034', 'good_luck0035', 'good_luck0036', 'good_luck0037', 'good_luck0038', 'good_luck0039',
                'good_luck0040', 'good_luck0041', 'good_luck0042',
                'idle'
            ] }),
            frameRate: 24
        });
        luck.on('pointerdown', function (pointer)
        {
            if (luck.frame.name === 'hover') {
                luck.play('good_luck')
                luck_sound.play()
            }
        });
        luck.on('pointerover', function (pointer)
        {
            if (luck.frame.name === 'idle') {
                luck.setFrame('hover')
            }
        });
        luck.on('pointerout', function (pointer)
        {
            if (luck.frame.name === 'hover') {
                luck.setFrame('idle')
            }
        });


        // Stable foreground and UI
        this.add.image(444, 261, 'stable_fg');

        // buttons
        const music_button = this.add.sprite(867, 498, 'music_button', 0).setInteractive({ pixelPerfect: true });
        const help_button = this.add.sprite(444, 261, 'help_button', 'idle').setInteractive(this.input.makePixelPerfect(150));
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
        help_button.on('pointerover', function (pointer)
        {
            this.setFrame('help')
        });
        help_button.on('pointerout', function (pointer)
        {
            this.setFrame('idle')
        });

        // progress bars
        const bar = 13
        // hunger
        const hunger_level = 1.5
        const hunger_pos = 353 - 32 + (hunger_level*bar/2)
        const hunger_width = 1 + hunger_level*bar
        this.add.rectangle(353, 505, 66, 2, 0x5f2041);
        const hungerBar = {
            x: 353,
            leftShine: this.add.rectangle(hunger_pos - hunger_width/2 - 1, 510, 3, 10, 0xfabad0),
            rightShade: this.add.rectangle(hunger_pos + hunger_width/2 + 1, 510, 3, 10, 0x983657),
            topShine: this.add.rectangle(hunger_pos, 506, hunger_width, 3, 0xfabad0),
            bottomShade: this.add.rectangle(hunger_pos, 514, hunger_width, 2, 0x983657),
            progress: this.add.rectangle(hunger_pos, 510, hunger_width, 7, 0xff6699),
            level: hunger_level
        }
        this.add.image(351, 509, 'hunger_scale');

        // cleanliness
        const cleanliness_level = 1
        const cleanliness_pos = 446 - 32 + (cleanliness_level*bar/2)
        const cleanliness_width = 1 + cleanliness_level*bar
        this.add.rectangle(446, 505, 66, 2, 0x123625);
        const cleanlinessBar = {
            x: 446,
            leftShine: this.add.rectangle(cleanliness_pos - cleanliness_width/2 - 1, 510, 3, 10, 0xb2f3b1),
            rightShade: this.add.rectangle(cleanliness_pos + cleanliness_width/2 + 1, 510, 3, 10, 0x1d7429),
            topShine: this.add.rectangle(cleanliness_pos, 506, cleanliness_width, 3, 0xb2f3b1),
            bottomShade: this.add.rectangle(cleanliness_pos, 514, cleanliness_width, 2, 0x1d7429),
            progress: this.add.rectangle(cleanliness_pos, 510, cleanliness_width, 7, 0x2fce30),
            level: cleanliness_level
        }
        this.add.image(444, 509, 'cleanliness_scale');

        // happiness
        const happiness_level = 1.75
        const happiness_pos = 542 - 32 + (happiness_level*bar/2)
        const happiness_width = 1 + happiness_level*bar
        this.add.rectangle(542, 505, 66, 2, 0x002353);
        const happinessBar = {
            x: 542,
            leftShine: this.add.rectangle(happiness_pos - happiness_width/2 - 1, 510, 3, 10, 0xb4e2fb),
            rightShade: this.add.rectangle(happiness_pos + happiness_width/2 + 1, 510, 3, 10, 0x004673),
            topShine: this.add.rectangle(happiness_pos, 506, happiness_width, 3, 0xb4e2fb),
            bottomShade: this.add.rectangle(happiness_pos, 514, happiness_width, 2, 0x004673),
            progress: this.add.rectangle(happiness_pos, 510, happiness_width, 7, 0x0099ff),
            level: happiness_level
        }
        this.add.image(540, 509, 'happiness_scale');

        function updateBar(progressBar, progressAdd) {
            progressBar.level += progressAdd

            progressBar.progress.setDisplaySize(progressBar.level*bar, progressBar.progress.height)
            progressBar.progress.setPosition(progressBar.x - 33 + (progressBar.level*bar/2), progressBar.progress.y)
            
            progressBar.topShine.setDisplaySize(progressBar.level*bar, progressBar.topShine.height)
            progressBar.topShine.setPosition(progressBar.x - 33 + (progressBar.level*bar/2), progressBar.topShine.y)
            
            progressBar.bottomShade.setDisplaySize(progressBar.level*bar, progressBar.bottomShade.height)
            progressBar.bottomShade.setPosition(progressBar.x - 33 + (progressBar.level*bar/2), progressBar.bottomShade.y)
            
            progressBar.rightShade.setPosition(progressBar.x - 32 + progressBar.level*bar, progressBar.rightShade.y)
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
            shovel_held_sprite.setPosition(pointer.worldX-18, pointer.worldY+35);
            if (!shovel_held_sprite.visible) {
                shovel_held_sprite.setVisible(true).play('shovel_pickup');
            }
        }
        else if (handcurrent === hand.fork) {
            fork_held_sprite.setPosition(pointer.worldX-20, pointer.worldY+45)
            if (!fork_held_sprite.visible) {
                fork_held_sprite.setVisible(true).play('fork_pickup');
            }
            else if (fork_held_sprite.anims.getName() === 'fork_fill') {
                fork_held_sprite.play('fork_place')
            }
        }
        else if (handcurrent === hand.fork_filled) {
            fork_held_sprite.setPosition(pointer.worldX-20, pointer.worldY+45)
            if (fork_held_sprite.anims.getName() === 'fork_pickup' || fork_held_sprite.anims.getName() === 'fork_place') {
                fork_held_sprite.play('fork_fill')
            }
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