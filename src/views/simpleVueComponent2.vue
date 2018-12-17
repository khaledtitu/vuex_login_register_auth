<style lang="css" >
    .form-horizontal .control-label{
          text-align: left
    }
    
    .lds-ring-container {
      position: absolute;
      right: 50%;
    }

    .lds-ring {
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 25px;
      height: 25px;
      // margin: 6px;
      border: 3px solid #ccc;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #ccc transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

	</style>
<template>
   

<div class="row">

<div class="vd_content-section clearfix" style="min-height:90vh">
<!-- Start double tabs -->
<div class="panel panel-tab panel-tab-double rounded shadow">
    <!-- Start tabs heading -->
    <div class="panel-heading no-padding">
        <ul class="nav nav-tabs">
            <li class="active">
                <a href="component-tabsaccordion.html#tab2-1" data-toggle="tab">
                    <i class="fa fa-user"></i>
                    <div>
                        <h6 class="text-strong">Manage Items</h6>
                    </div>
                </a>
            </li>
            <li>
                <a href="component-tabsaccordion.html#tab2-2" data-toggle="tab">
                    <i class="fa fa-plus-circle"></i>
                    <div>
                        <h6 class="text-strong">Add Category</h6>
                    </div>
                </a>
            </li>
            
        </ul>
    </div><!-- /.panel-heading -->
    <!--/ End tabs heading -->

    <!-- Start tabs content -->
    <div class="panel-body">
        <div class="tab-content">
            <div class="tab-pane fade in active" id="tab2-1">
                
<div class="col-md-12" style="padding-top:30px">
  <div class="col-md-2">
      <select v-model="bazar_per_page" @change="selectVal()" name="pages_select" style="padding: 5px; margin: 5px 0;">
      <option selected value="10">10</option>
      <option value="15">15</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="150">150</option>
      <option value="200">200</option>
    </select>
  </div>
<table class="table table-striped table-primary">

<thead>
<tr>
	<th>#</th>
	<th>Item ID</th>
	<th>Image</th>
	<th>Username</th>
	<th>Category</th>
	<th>Subcategory</th>
	<th>Option</th>
</tr>
</thead>
<tbody>
  <div class="lds-ring-container" v-if="loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
<tr v-for="(Bazar, index) in bazarGetters">
	<td class="text-center" style="width: 7%;">
       <b>{{index+1}}</b>
    </td>

    <td>
        {{Bazar.id}}
    </td>
     <td class="text-center" style="width: 1%">
     <img v-bind:src="apiUrl+'/storage/images/bazar/'+Bazar.image" alt="..." width="160" class="mt-5 mb-5">
 </td>

	<td>
		{{Bazar.user.name}}
	</td> 
	<td>{{Bazar.category.name}}</td> 
	<td>{{Bazar.subcategory.name}}</td> 
	<td class="menu-action">
		<div class="pdng5">
			<!-- <a data-toggle="modal" data-target="#ViewItemBazar" class="btn btn-xs btn-default"><i class="fa fa-eye" data-original-title="Edit" data-toggle="tooltip" data-placement="top" ></i></a>
			
			<a data-toggle="modal" data-target="#removeLang" class="btn btn-xs btn-default"><i class="fa fa-trash-o" data-original-title="Remove" data-toggle="tooltip" data-placement="top" ></i></a> -->

			<!-- <button @click="editBazar(index)" type="button" :disabled="loading" class="btn btn-success"><i class="fa fa-pencil" ></i></button> -->

      <button @click="editBazar(index)" type="button" :disabled="loading" class="btn btn-success"><i class="fa fa-eye" ></i></button>
      
      <button @click="removeBazar(Bazar.id)" class="btn btn-danger" data-toggle="modal"><i class="fa fa-trash"></i></button>

		</div>
	</td>
</tr>

</tbody>
</table>
            
             <paginate
            v-model="bazarPageGetters"
            :page-count="bazarPageTotalGetters"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
</div><!-- col-md-12 end -->    
            </div>
<div class="tab-pane fade" id="tab2-2">
<div class="col-md-3"></div>
<div class="col-md-3">
<button type="button" class="btn btn-primary col-xs-12 btn-lg" data-toggle="modal" data-target="#AddLangBazar">
<span class="append-icon"><i class="fa fa-plus-square"></i></span>&nbsp;Add Category</button>
</div>
<div class="col-md-3">
<button type="button" class="btn btn-primary col-xs-12 btn-lg" data-toggle="modal" data-target="#addLang1">
<span class="append-icon"><i class="fa fa-plus-square"></i></span>&nbsp;Add Subcategory</button>
</div>
<div class="col-md-3"></div>
<div class="col-md-12" style="padding-top:30px">
<table class="table table-striped table-primary">

<thead>
<tr>
	<th>#</th>
	<th>Category</th>
	<th>Subcategory</th>
	<th>Option</th>
</tr>
</thead>
<tbody>
	
<tr v-for="(BazarSubCat, index) in bazarSubCatGetters">
	<td class="text-center" style="width: 7%;">
        <b>{{index+1}}</b>
    </td>                               
	<td>{{BazarSubCat.category.name}}</td> 
    <td>{{BazarSubCat.name}}</td> 
	<td class="menu-action">
		<div class="pdng5">
			<!-- <a data-toggle="modal" data-target="#EditcatBazar" class="btn btn-xs btn-default"><i class="fa fa-pencil" data-original-title="Edit" data-toggle="tooltip" data-placement="top" ></i></a>
			<a data-toggle="modal" data-target="#removeLang" class="btn btn-xs btn-default"><i class="fa fa-trash-o" data-original-title="Remove" data-toggle="tooltip" data-placement="top" ></i></a> -->
			<button @click="editBazarSubCat(index)" type="button" :disabled="loading" class="btn btn-success"><i class="fa fa-pencil" ></i></button>

            <button @click="removeBazarSubCat(BazarSubCat.id)" class="btn btn-danger" data-toggle="modal"><i class="fa fa-trash"></i></button>

		</div>
	</td>
</tr>

</tbody>
</table>
           
</div>
</div>
           
        </div>
    </div><!-- /.panel-body -->
    <!--/ End tabs content -->
</div><!-- /.panel -->

</div>
</div>

				
</template>

<script type="text/javascript">
  export default {
       data(){
           return {

               loading: false,
               bazars: [],
               bazarSubCatData: [],
               bazar_cat:[],
               bazar_per_page:10,
               
              }
           },
        created(){
         this.readBazarCat()
         this.readBazar()
         this.readBazarSubCat()
        },
        watch: {

              },
       mounted()

       {
         
       },
        computed: {
            bazarCatGetters() {

              return this.$store.getters.bazarCatGetters
            },
            bazarSubCatGetters() {

              return this.$store.getters.bazarSubCatGetters
            },
             bazarGetters() {

              return this.$store.getters.bazarGetters
            },
            apiUrl(){

             return this.$store.state.apiUrl
            },

            bazarPageGetters: {
               get: function() {

                  return this.$store.getters.bazarPageGetters
                },
                set: function(newValue) {

                }

            },
            bazarPageTotalGetters() {

              return this.$store.getters.bazarPageTotalGetters
            },
            bazarPerPageGetters() {

              return this.$store.getters.bazarPerPageGetters
            }

          },
        methods: {

           clickCallback: function(page) {
              console.log(page)
              this.$store.state.bazar_page=page
              this.$store.state.bazar_per_page=this.bazar_per_page
              this.readBazar()
            }, 
            selectVal(){
              
             this.$store.state.bazar_per_page=this.bazar_per_page
             this.$store.state.bazar_page=1 
             this.readBazar()

            },
            readBazarCat()
           {
                this.loading = true
                this.$store.dispatch('bazarCatData')
                .then(response => {
                   this.loading = false
                    console.log(response.data.data);
                    this.bazar_cat = response.data.data
                })
           },
           editBazarCat(index){

            console.log(this.$store.state.bazarCatAll[index]);
            
            this.$store.commit('bazarCatEdit', this.$store.state.bazarCatAll[index])
  
            //$("#EditbazarCategory").modal("show");

            
           },
           removeBazarCat(id) {

            let conf = confirm(" Do you ready want to delete this Data? ");

            if (conf === true) {

            this.$store.dispatch('deleteBazarCat', id)
              .then(response => { 
                 // this.reset()   
                  console.log(response);
                  this.$toast.success({
                    title: 'Deleted  successfully ',
                  })
                })
                .catch(error => {

                })


              }
           },
           readBazarSubCat()
           {
                this.loading = true
                this.$store.dispatch('bazarSubCatData')
                .then(response => {
                   this.loading = false
                    console.log(response.data.data);
                    this.bazarSubCatData = response.data.data
                })
           },
           editBazarSubCat(index){

            console.log(this.bazarSubCatData[index]);
            
           this.$store.commit('bazarSubCatEdit', this.bazarSubCatData[index])
           //this.bazarSubCatData = this.bazarSubCatData[index];
  
            $("#EditCatBazar").modal("show");

            
           },
           removeBazarSubCat(id) {

            let conf = confirm(" Do you ready want to delete this Data? ");

            if (conf === true) {

            this.$store.dispatch('deleteBazarSubCat', id)
              .then(response => { 
                 // this.reset()   
                  console.log(response);
                  this.$toast.success({
                    title: 'Deleted  successfully ',
                  })
                })
                .catch(error => {

                })


              }
           },
           readBazar()
           {
                this.loading = true
                this.$store.dispatch('bazarData',{
                    current_page: this.$store.state.bazar_page,
                    per_page: this.$store.state.bazar_per_page,
                })
                .then(response => {
                   this.loading = false
                   // console.log(response.data.data);
                    this.bazars = response.data.data
                    this.$store.state.bazar_page_total = response.data.totalPage
                    this.$store.state.bazar_page= response.data.currentPage
                    this.$store.state.bazar_per_page= response.data.per_page
                })
           },
           editBazar(index){

             console.log(this.bazars[index]);
            
             this.$store.commit('bazarEdit', this.bazars[index])
  
             $("#ViewItemBazar").modal("show");

           },
           removeBazar(id) {

            let conf = confirm(" Do you ready want to delete this Data? ");

            if (conf === true) {

            this.$store.dispatch('deleteBazar', id)
              .then(response => { 
                 // this.reset()   
                  console.log(response);
                  this.$toast.success({
                    title: 'Deleted  successfully ',
                  })
                })
                .catch(error => {

                })


            }

              

            }

       }

   }

</script>
