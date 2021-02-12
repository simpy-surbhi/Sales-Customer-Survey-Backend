using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using CustomerSurveyCore;
using System.Web.Http.Cors;

namespace CustomerSurvey.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CustomerController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/customer/getAllSurvey")]
        public IEnumerable<CustomerSurveyTable> GetCustomerData()
        {
            using (CustomerSurveyCore.CustomerEntities entitie = new CustomerSurveyCore.CustomerEntities()) {
                return entitie.CustomerSurveyTables.ToList();
            }
        }

        public Dictionary<String, String> PostSurveyData(CustomerSurveyTable survey)
        {
            using (CustomerSurveyCore.CustomerEntities entitie = new CustomerSurveyCore.CustomerEntities())
            {

                entitie.CustomerSurveyTables.Add(survey);
                entitie.SaveChanges();
                var res = new Dictionary<string, string>();
                res["msg"] = "Survey Saved Succesfully";
                return res;
            }
        }

        [HttpGet]
        [Route("api/customer/agesurvey")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<List<String>> GetAgeSurvey()
        {
            using (CustomerSurveyCore.CustomerEntities entitie = new CustomerSurveyCore.CustomerEntities())
            {
                var belowcount = entitie.CustomerSurveyTables.Count(o => o.Age < 18);
                List<String> list1 = new List<String>();
                List<String> list2 = new List<String>();
                list1.Add("Below 18");
                list2.Add(belowcount.ToString());

               
                var belowcountunlicenced = entitie.CustomerSurveyTables.Count(o => (o.Age < 18 || o.Drivinglicense == "No"));
                list1.Add( "UnLicensed Driver");
                list2.Add(belowcountunlicenced.ToString());


                var belowcountfirstcar = entitie.CustomerSurveyTables.Count(o => ((o.Age > 18 && o.Age < 25) && o.Firstcar == "Yes"));
                list1.Add("First car owners participated ");
                list2.Add(belowcountfirstcar.ToString());

                var belowcounttargetclient = entitie.CustomerSurveyTables.Count(o => o.Drivinglicense == "Yes" && o.Firstcar == "No");
                list1.Add("Targetable Clients");
                list2.Add(belowcounttargetclient.ToString());

                List<List<String>> list = new List<List<String>>();
                list.Add(list1);
                list.Add(list2);
                return list;
            }
        }

        [HttpGet]
        [Route("api/customer/targetableclients")]
        public IEnumerable<List<String>> TargetableClients()
        {
            using (CustomerSurveyCore.CustomerEntities entitie = new CustomerSurveyCore.CustomerEntities())
            {
                var targettotalclient = entitie.CustomerSurveyTables.Count(o => o.Drivinglicense == "Yes" && o.Firstcar == "No");

                var fuelemiison = entitie.CustomerSurveyTables.Count(o => o.Drivinglicense == "Yes" && o.Firstcar == "No" && o.Fuelemissions == "Yes");

                var fuelemissionpercentage = (fuelemiison * 100) / targettotalclient;

                var drivetrain = entitie.CustomerSurveyTables.Count(o => o.Drivinglicense == "Yes" && o.Firstcar == "No" && (o.Drivetrain == "FWD" || o.Drivetrain == "IDK"));

                var drivetrainpercentage = (drivetrain * 100) / targettotalclient;


                var list1 = new List<string>();
                list1.Add("Fuel Emission(%)");
                list1.Add("Drive Train(%)");
                list1.Add("Others(%)");
                var list2 = new List<string>();
                list2.Add(fuelemissionpercentage.ToString());
                list2.Add(drivetrainpercentage.ToString());
                list2.Add((100 - (fuelemissionpercentage + drivetrainpercentage)).ToString());
                
                List<List<String>> list = new List<List<string>>();
                list.Add(list1);
                list.Add(list2);
            
                return list;
            }
        }

        [HttpGet]
        [Route("api/customer/averagecar")]
        public Dictionary<String, String> AverageCar()
        {
            using (CustomerSurveyCore.CustomerEntities entitie = new CustomerSurveyCore.CustomerEntities())
            {
                var belowcount = entitie.CustomerSurveyTables.Sum(o => o.NoOfCar);
                var abovecount = entitie.CustomerSurveyTables.Count();
                var avgfamily = (belowcount / abovecount).ToString();
                
                Dictionary<String, String> dict = new Dictionary<string, string>();
                dict.Add("avg",avgfamily);
                return dict;
            }
        }

        [HttpGet]
        [Route("api/customer/carmodels")]
        public List<List<String>> AverageCar(string carname)
        {
            using (CustomerSurveyCore.CustomerEntities entitie = new CustomerSurveyCore.CustomerEntities())
            {
                var carmodels = entitie.CustomerSurveyTables.Where(o => o.CarName == carname).Select(e => new { e.CarModel }).Distinct().ToList();

                var list2 = new List<string>();
                var list1 = new List<string>();
                for (int i = 0; i < carmodels.Count(); i++) {
                    var valuestmp = carmodels[i].CarModel;
                    var counttemp = entitie.CustomerSurveyTables.Count(o => (o.CarName == carname && o.CarModel == valuestmp));
                    list1.Add(counttemp.ToString());
                    list2.Add(valuestmp);
                }
                //test

                List<List<String>> list = new List<List<string>>();
                list.Add(list2);
                list.Add(list1);
                return list;
            }
        }

    }
}
