@include( 'javascript')
@include( 'stylesheet')

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
   
    @include( 'includes.head')
    <body>
        <div class="container-fluid">
            @yield('body')
        </div>
        @stack('footer_js')
    </body>
</html>
