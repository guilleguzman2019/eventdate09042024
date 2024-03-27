<nav id="sidebar" class="sidebar">
            <div class="sidebar-content">
                <a class="sidebar-brand text-center" href="index.html">
                    <img src="https://eventdate.es/wp-content/uploads/2022/10/LOGO-EVENTDATE-BLANCO.png" alt="" width="160">
                </a>
                <ul class="sidebar-nav">
					<li class="sidebar-header">
						Admin
					</li>

					<li class="sidebar-item active">
						<a class="sidebar-link" href="{{ route('admin.componentes') }}">
              <i class="fa-solid fa-table-columns" style="color: #ffffff;"></i><span class="align-middle">Componentes</span>
            </a>
					</li>

					<li class="sidebar-item">
						<a class="sidebar-link" href="{{ route('admin.templates') }}">
              <i class="fa-regular fa-file" style="color: #ffffff;"></i> <span class="align-middle">Templates</span>
            </a>
					</li>

					<li class="sidebar-item">
						<a class="sidebar-link" href="{{ route('admin.categorias') }}">
                            <i class="fa-solid fa-van-shuttle" style="color: #ffffff;"></i><span class="align-middle">Categorias</span>
                        </a>
					</li>

					<li class="sidebar-item">
						<a class="sidebar-link" href="">
              <i class="fa-solid fa-gears" style="color: #ffffff;"></i><span class="align-middle">Settings</span>
            </a>
					</li>
				</ul>
            </div>

</nav>