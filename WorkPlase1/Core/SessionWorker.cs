using System.Text.Json;
using WorkPlase1.Models;

namespace WorkPlase1.Core
{
    public class SessionWorker
    {
        private HttpContext Context;
        public SessionWorker(HttpContext context)
        {
            Context = context;
        }
        public void SaveToken(string token)
        {
            Context.Session.SetString("token", $"Bearer {token}");
        }

        public void SaveUserModel(AuthUserModel user)
        {
            Context.Session.SetString("user", JsonSerializer.Serialize<AuthUserModel>(user));
        }

        public int GetUserId()
        {
            var user = Context.Session.GetString("user");
            if(user!=null)
            { 
            return JsonSerializer.Deserialize<AuthUserModel>(user).ID;
            }
            return -1;
        }
        public string GetUserName()
        {
            var user = Context.Session.GetString("user");
            if (user != null)
            {
                return JsonSerializer.Deserialize<AuthUserModel>(user).name;
            }
            return "";
        }
        public bool IsEmployer()
        {
            var user = Context.Session.GetString("user");
            if (user != null)
            {
                return JsonSerializer.Deserialize<AuthUserModel>(user).role==Role.Employer;
            }
            return false;
        }

        public bool IsAuthorized()
        {
            var user = Context.Session.GetString("user");

            return (user != null);
        }
        public void Clear()
        {
          Context.Session.Clear();
        }
    }
}
