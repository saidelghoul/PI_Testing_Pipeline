import  '../../../public/assets/css/activite.css';

export default function Activites() {
  return (
    <>
      <main className="content">
    <div className="container p-0">

        <h1 className="h3 mb-3">Kanban Board</h1>

        <div className="row">
            <div className="col-12 col-lg-6 col-xl-3">
                <div className="card card-border-primary">
                    <div className="card-header">
                        <div className="card-actions float-right">
                            <div className="dropdown show">
                                <a href="#" data-toggle="dropdown" data-display="static">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <h5 className="card-title">Upcoming</h5>
                        <h6 className="card-subtitle text-muted">Nam pretium turpis et arcu. Duis arcu tortor.</h6>
                    </div>
                    <div className="card-body p-3">

                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" checked=""/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" checked=""/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis tristique.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>

                        <a href="#" className="btn btn-primary btn-block" style={{backgroundColor:"#e44d3a"}}>Add new</a>

                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
                <div className="card card-border-warning">
                    <div className="card-header">
                        <div className="card-actions float-right">
                            <div className="dropdown show">
                                <a href="#" data-toggle="dropdown" data-display="static">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <h5 className="card-title">In Progress</h5>
                        <h6 className="card-subtitle text-muted">Nam pretium turpis et arcu. Duis arcu tortor.</h6>
                    </div>
                    <div className="card-body">

                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis tristique.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>

                        <a href="#" className="btn btn-primary btn-block" style={{backgroundColor:"#e44d3a"}}>Add new</a>

                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
                <div className="card card-border-danger">
                    <div className="card-header">
                        <div className="card-actions float-right">
                            <div className="dropdown show">
                                <a href="#" data-toggle="dropdown" data-display="static">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <h5 className="card-title">On hold</h5>
                        <h6 className="card-subtitle text-muted">Nam pretium turpis et arcu. Duis arcu tortor.</h6>
                    </div>
                    <div className="card-body">

                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis tristique.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>

                        <a href="#" className="btn btn-primary btn-block" style={{backgroundColor:"#e44d3a"}}>Add new</a>

                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
                <div className="card card-border-success">
                    <div className="card-header">
                        <div className="card-actions float-right">
                            <div className="dropdown show">
                                <a href="#" data-toggle="dropdown" data-display="static">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <h5 className="card-title">Completed</h5>
                        <h6 className="card-subtitle text-muted">Nam pretium turpis et arcu. Duis arcu tortor.</h6>
                    </div>
                    <div className="card-body">

                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis tristique.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <div className="card mb-3 bg-light">
                            <div className="card-body p-3">
                                <div className="float-right mr-n2">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"/>
                                        <span className="custom-control-label"></span>
                                    </label>
                                </div>
                                <p>Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.</p>
                                <div className="float-right mt-n1">
                                    <img src="/assets/images/resources/user-pro-img.png" width="32" height="32" className="rounded-circle" alt="Avatar"/>
                                </div>
                                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
                            </div>
                        </div>
                        <a href="#" className="btn btn-primary btn-block" style={{backgroundColor:"#e44d3a"}}>Add new</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</main>
    </>
  )
}
