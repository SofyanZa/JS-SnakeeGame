<section id="login">
    <div id="cover-caption">
        <div id="container" class="container">
            <div class="row text-white">
                <div class="col-sm-6 offset-sm-3 text-center">
                    <h1 class="display-4 font-weight-bold">LOGIN</h1>
                    <div class="info-form">
                        <form action="" method='post' class="form-inlin justify-content-center">
                            <div class="form-group">
                                <label class="sr-only">Login</label>
                                <input type="text" class="form-control" placeholder="Pseudo">
                            </div>
                            <div class="form-group">
                                <label class="sr-only">Password</label>
                                <input type="text" class="form-control" placeholder="Password">
                            </div>
                            <button type="submit" class="btn btn-success">SIGN IN</button> <!-- se connecter -->
                            <a class="btn btn-primary" href="<?= $router->generate('register'); ?>" role="button">SIGN UP</a> <!-- s'inscrire   -->   
                                  
                        </form>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
</section>