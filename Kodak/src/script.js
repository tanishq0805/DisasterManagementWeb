// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your Firebase config (replace with your real config)
const firebaseConfig = {
  apiKey: "AIzaSyDIYxj6OZtrbuK6fksEhSP0J8bWVxTbFLk",
  authDomain: "kodak-drm.firebaseapp.com",
  projectId: "kodak-drm",
  storageBucket: "kodak-drm.firebasestorage.app",
  messagingSenderId: "384201443465",
  appId: "1:384201443465:web:3490c1628a040e51d5de58",
  measurementId: "G-LGW14BZPZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const reportForm = document.getElementById('reportForm');
const reportList = document.getElementById('reportList');

reportForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const report = {
    name: document.getElementById('name').value,
    location: document.getElementById('location').value,
    type: document.getElementById('type').value,
    details: document.getElementById('details').value,
    status: 'pending_verification',
    time: serverTimestamp()
  };

  await addDoc(collection(db, "reports"), report);
  reportForm.reset();
  loadReports();
});

async function loadReports() {
  const querySnapshot = await getDocs(collection(db, "reports"));
  reportList.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const r = doc.data();
    reportList.innerHTML += `
      <div class="report">
        <h3>${r.type} at ${r.location}</h3>
        <p><strong>By:</strong> ${r.name} | <strong>Status:</strong> ${r.status}</p>
        <p>${r.details}</p>
      </div>
    `;
  });
}

loadReports();
