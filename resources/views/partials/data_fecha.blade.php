 <style>
     .data-fecha {
         text-align: center;
         margin-top: 70px;
         font-size: 1.0rem;

     }
 </style>

 <div class="data-fecha">Constancia que se expide en

     @if ($globalDia == 01)
     Tucupita al primer <b><u> {{ $globalDia }} </u></b> día del mes de
     <b><u>{{ ucfirst($globalMes) }}</u></b> del año <b><u> {{ $globalAho }} </u></b>
     @endif
     @if ($globalDia != 01)
     Tucupita a los <b><u> {{ $globalDia }} </u></b> dias del mes de
     <b><u>{{ ucfirst($globalMes) }}</u></b>
     del año <b><u> {{ $globalAho }} </u></b>
     @endif
 </div>