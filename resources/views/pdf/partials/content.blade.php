  <style>
      .content {
          text-align: justify;
          line-height: 1.9;
          margin-top: -25px;
          font-size: 1.1rem;
          text-indent: 15px;
          font-family: mono;
          color: black;
          letter-spacing: 1px;
      }

      .content::first-letter {
          margin-left: 20px;
      }
  </style>


  <div class="content">

      Quien suscribe

      @if ($globalDirector)
      <b><u>{{ $globalDirectorGradosCompleto }} {{ $globalDirectorCompleto}}</u></b>
      Cédula de identidad <b><u>{{ $globalDirector->documento }}{{ $globalDirector->cedula }}</u></b>
      @else
      __________________________________________________ Cédula de identidad _________________________
      @endif

      en su condición de Director(a) de la <b><u>{{ $globalInstitucion->nombre_de_la_institucion }}</u></b>,
      código DEA <b><u>{{ $globalInstitucion->codigo_dea }}</u></b>,

      código del plantel <b><u>{{ $globalInstitucion->codigo_de_dependencia }} </u></b>,

      que funciona en la Comunidad de <b><u>{{ $globalInstitucion->direccion }}</u></b>,

      Parroquia <b><u>{{ $globalInstitucion->parroquia }}</u></b>,

      del Estado <b><u>{{ $globalInstitucion->estado }},</u></b>

      y adscrita a la dependencia <b><u>{{ $globalInstitucion->zona_educativa }}</u></b>,


      {!! $section !!}
  </div>