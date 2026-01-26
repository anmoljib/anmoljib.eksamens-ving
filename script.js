const SUPABASE_URL = "https://fsvasynwgxthvtzhwtkf.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdmFzeW53Z3h0aHZ0emh3dGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MTQwMzQsImV4cCI6MjA4NDM5MDAzNH0.oTtgf9IMZsC4RSiXNCnCnGqnWYFAdz6s-2H_X79amSY";

// Lag Supabase-klient
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Knapper (sjekk at de finnes på siden før vi legger til event listeners)
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
if (loginBtn) loginBtn.addEventListener("click", login);
if (registerBtn) registerBtn.addEventListener("click", register);

// REGISTRER
async function register() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = "index.html";
}

// LOGG INN
async function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Feil e-post eller passord");
    return;
  }

  window.location.href = "index.html";
}
