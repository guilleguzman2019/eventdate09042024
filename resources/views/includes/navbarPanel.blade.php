<!--<header class="page-header">
        <nav>
          <a href="/" aria-label="forecastr logo" class="logo mt-4" style="text-align: center; ">
            <img src="https://eventdate.es/wp-content/uploads/2022/10/LOGO-EVENTDATE-BLANCO.png" alt="" width="160" style="margin: 0 auto;">
          </a>
          <button class="toggle-mob-menu" >
            <i class="fas fa-bars"></i>
          </button>
          <ul class="admin-menu">
            <li class="menu-heading">
              <h3>Cliente</h3>
            </li>
            <li>
              <a href="{{ route('panel.crear') }}">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"> <style>svg{fill:#ffffff}</style><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                <span>Crear Invitacion</span>
              </a>
            </li>
            <li>
              <a href="{{ route('panel.invitaciones') }}">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM256 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64H64V384H384V64z"/></svg>
                <span>Invitaciones</span>
              </a>
            </li>
            <li style="display:none">
              <a href="./crear">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z"/></svg>
                <span>Invitados</span>
              </a>
            </li>
            <li style="display:none">
              <a href="./eventos">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
                <span> Eventos</span>
              </a>
            </li>
            <li>
              <a href="{{ route('panel.transporte') }}">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><style>svg{fill:#ffffff}</style><path d="M64 104v88h96V96H72c-4.4 0-8 3.6-8 8zm482 88L465.1 96H384v96H546zm-226 0V96H224v96h96zM592 384H576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H48c-26.5 0-48-21.5-48-48V104C0 64.2 32.2 32 72 32H192 352 465.1c18.9 0 36.8 8.3 49 22.8L625 186.5c9.7 11.5 15 26.1 15 41.2V336c0 26.5-21.5 48-48 48zm-64 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM160 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                <span>Transporte</span>
              </a>
            </li>
            <li>
              <a href="{{ route('panel.confirmados') }}">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                <span>Confirmacion</span>
              </a>
            </li>
            <li>
              <a href="{{ route('panel.musica') }}">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#f5f5f5}</style><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>
                <span>Musica</span>
              </a>
            </li>
        </nav>
</header>-->

<nav id="sidebar" class="sidebar">
            <div class="sidebar-content">
                <a class="sidebar-brand text-center" href="index.html">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/LOGO-EVENTDATE-BLANCO.png" alt="" width="160">
                </a>
                <ul class="sidebar-nav">
					<li class="sidebar-header">
						Cliente
					</li>

					<li class="sidebar-item">
						<a class="sidebar-link" href="{{ route('panel.invitaciones') }}">
              <i class="fa-solid fa-layer-group" style="color: #ffffff;"></i><span class="align-middle"> Invitaciones</span>
            </a>
					</li>

					<li class="sidebar-item">
						<a class="sidebar-link" href="{{ route('panel.confirmados') }}">
                            <i class="fa-solid fa-check" style="color: #ffffff;"></i> <span class="align-middle">Confirmados</span>
                        </a>
					</li>

					<li class="sidebar-item">
						<a class="sidebar-link" href="{{ route('panel.musica') }}">
              <i class="fa-solid fa-music" style="color: #f4f5f6;"></i><span class="align-middle">Musica</span>
            </a>
					</li>

					<li class="sidebar-item">
						<a class="sidebar-link" href="{{ route('panel.transporte') }}">
              <i class="fa-solid fa-van-shuttle" style="color: #ffffff;"></i><span class="align-middle">Transporte</span>
            </a>
					</li>
				</ul>
            </div>

</nav>