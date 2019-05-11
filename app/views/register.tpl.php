       

<!-- 
* _____ Page des enregistrement/sign in____*
|                                          |
|                                          |
|     ################################     |  
|                                          |
|                                          |
|__________________________________________|

-->


    
    <main class="main-register">

    <div class="row d-flex justify-content-center">
	<aside class="col-sm-3">

<div class="card">
<article class="card-body">
<a href="<?= $router->generate('home'); ?>" class="float-right btn btn-outline-success text-black">SIGN IN</a>
<h4 class="card-title mb-4 mt-1 text-dark">SIGN UP</h4>
	 <form>
    <div class="form-group">
    	<label>Your pseudo</label>
        <input name="" class="form-control" placeholder="Pseudo" type="pseudo">
    </div> <!-- form-group// -->
    <div class="form-group">
    	<a class="float-right" href="#">Forgot?</a>
    	<label>Your password</label>
        <input class="form-control" placeholder="******" type="password">
    </div> <!-- form-group// --> 
    <div class="form-group"> 
    <div class="checkbox text-dark">
      <label> <input type="checkbox"> Save password </label>
    </div> <!-- checkbox .// -->
    </div> <!-- form-group// -->  
    <div class="form-group">
        <button type="submit" class="btn btn-success btn-block "> Login  </button>
    </div> <!-- form-group// -->                                                           
</form>
</article>
</div> <!-- card.// -->

	</aside> <!-- col.// -->
            

    </main>
    




