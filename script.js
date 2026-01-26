const SUPABASE_URL = "https://fsvasynwgxthvtzhwtkf.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdmFzeW53Z3h0aHZ0emh3dGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MTQwMzQsImV4cCI6MjA4NDM5MDAzNH0.oTtgf9IMZsC4RSiXNCnCnGqnWYFAdz6s-2H_X79amSY";

// Lag Supabase-klient
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// LOGG INN
async function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  if (!email || !password) {
    if (errorMessage) {
      errorMessage.textContent = "Vennligst fyll inn både e-post og passord";
      errorMessage.style.display = "block";
    }
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (errorMessage) {
        errorMessage.textContent = "Feil: " + error.message;
        errorMessage.style.display = "block";
      }
      console.error("Login error:", error);
      return;
    }

    if (data.user) {
      console.log("Login vellykket!");
      // Redirect to index.html after successful login
      window.location.href = "index.html";
    }
  } catch (err) {
    if (errorMessage) {
      errorMessage.textContent = "En feil oppstod: " + err.message;
      errorMessage.style.display = "block";
    }
    console.error("Exception:", err);
  }
}

// REGISTRER
async function register() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  if (!email || !password) {
    if (errorMessage) {
      errorMessage.textContent = "Vennligst fyll inn både e-post og passord";
      errorMessage.style.display = "block";
    }
    return;
  }

  try {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (errorMessage) {
        errorMessage.textContent = "Feil: " + error.message;
        errorMessage.style.display = "block";
      }
      console.error("Register error:", error);
      return;
    }

    if (errorMessage) {
      errorMessage.style.display = "none";
    }
    console.log("Registrering vellykket!");
    window.location.href = "index.html";
  } catch (err) {
    if (errorMessage) {
      errorMessage.textContent = "En feil oppstod: " + err.message;
      errorMessage.style.display = "block";
    }
    console.error("Exception:", err);
  }
}
