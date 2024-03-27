<nav class="navbar navbar-expand navbar-light navbar-bg px-4">
				<a class="sidebar-toggle js-sidebar-toggle">
                    <i class="fa-solid fa-bars-staggered"></i>
        		</a>

				<div class="navbar-collapse collapse">
					<ul class="navbar-nav navbar-align">
						
						<li class="nav-item dropdown">
							<a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                                <i class="fa-regular fa-user"></i>
                            </a>

							<a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                <img src="https://i.postimg.cc/90n19jtC/avatar.jpg" class="avatar img-fluid rounded  d-inline" alt="Charles Hall"> <span class="text-dark">{{ Auth::user()->name }}</span>
              </a>
							<div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="{{route('profile.edit')}}"><i class="align-middle " data-feather="user">
                                    {{ __('Profile') }}
                                </a>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
								    <a class="dropdown-item" onclick="event.preventDefault(); this.closest('form').submit();" href="{{ route('logout') }}">Finalizar Sesion</a>
                                </form>
                            </div>
						</li>
					</ul>
				</div>
</nav>
