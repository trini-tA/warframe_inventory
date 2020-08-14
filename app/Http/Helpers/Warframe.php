<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;
use Str;

class Warframe{
    public static function uniqueRelic( array $drops ){
        $relics = array();
        foreach( $drops as $relic ){
            $name = Str::replaceLast( ' Intact', '', $relic->location );
            $name = Str::replaceLast( ' Exceptional', '', $name );
            $name = Str::replaceLast( ' Flawless', '', $name );
            $name = Str::replaceLast( ' Radiant', '', $name );

            $relics[$name] = $name;
        }

        return collect($relics);
    }
}