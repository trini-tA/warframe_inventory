@extends('layouts.default')

@section('body')
    <div class="flex-center position-ref">
        <h1>List items</h1>
    </div>

    <div class="position-ref">
        @foreach( $allFiles as $file )
            @if( Str::contains( $file, 'All' ) )
                @continue
            @endif
            <a href="{{ route( 'warframe.index', ['filename' => Str::replaceLast( '.json', '', $file ) ] ) }}" class="btn btn-default">{{ Str::replaceLast( '.json', '', $file ) }}</a>
        @endforeach
    </div>
    <div class="container">
        <div id="container-items" class="row">
            @if( $data )
                @foreach( $data as $item )
                    <div class="col-md-4">
                        <div class="card card-warframe">
                            <img src="https://cdn.warframestat.us/img/{{ $item->imageName }}" class="card-img-top" alt={{ $item->name }} />
                            <div class="card-body">
                                <h2 class="card-header">{{ $item->name }}</h2>
                                <p class="card-text">{{ $item->name }}</p>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#dropsModal" data-filename="{{ $filename }}" data-unique-name="{{ $item->uniqueName }}">{{ __( 'Show drops' ) }}</button>
                                <button type="button" class="btn btn-primary disabled" disabled>Add on my inventory</button>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </div>

    <div class="modal fade" id="dropsModal" tabindex="-1" role="dialog" aria-labelledby="dropsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="dropsModalLabel">{{ __('Components') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

@endsection
