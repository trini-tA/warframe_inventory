<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WarframeController extends Controller{

    public function index( Request $request, $filename = null ){

        $data = null;
        
        if( !empty( $filename ) ){
            $data = collect( json_decode( Storage::disk( 'warframe' )->get( $filename . '.json' ) ) );
        }
        $allFiles = Storage::disk( 'warframe' )->allFiles();
        
        return view( 'items/data', [ 'allFiles' => $allFiles, 'data' => $data, 'filename' => $filename ] );
    }

    public function api( Request $request ){

        $filename = $request->get( 'filename' );
        $uniqueName = $request->get( 'uniqueName' );
        $data = null;
        $returnItem = null;

        if( !empty( $filename ) ){
            $data = $this->r_collect( json_decode( Storage::disk( 'warframe' )->get( $filename . '.json' ) ) );
            foreach( $data as $item ){
                if( $item->uniqueName == $uniqueName ){
                    break;
                }
            }
        }
        //dd( $item );
        //dd( $returnItem );

        return view( 'items.item', ['item' => $item ] );
    }

    private function r_collect($array){
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $value = r_collect($value);
                $array[$key] = $value;
            }
        }

        return collect($array);
    }

}
