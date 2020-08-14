<h3>{{ $item->name }}</h3>
@if( $item->components )
    @foreach( $item->components as $components )
        @if( $components->name == 'Orokin Cell' || $components->name == 'Forma' )
            @continue;
        @endif 
        <h4 class="card-text">{{ $components->name }}</h4>
        @if( !empty( $components->ducats ) ) 
            <p class="card-text">{{ __('ducats') }}&nbsp;{{ $components->ducats }}</p>
        @endif 

        @if( !empty( $components->drops ) )
            <ul>
                @foreach( Warframe::uniqueRelic( $components->drops ) as $relic )
                    <li>{{ $relic }}</li>
                @endforeach
            </ul>
        @endif

    @endforeach
@endif