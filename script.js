 let eventsData = [];
    const upcomingContainer = document.getElementById("upcoming-container");
    const pastContainer = document.getElementById("past-container");

    async function loadEvents() {
     try {
        const response = await fetch("../../data/events.json"); // Load external JSON
        eventsData = await response.json();
        renderEvents();
      } catch (error) {
        console.error("Error loading events:", error);
      }
    }
  

    function renderEvents() {
      upcomingContainer.innerHTML = "";
      pastContainer.innerHTML = "";

      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      eventsData.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
          <img src="${event.main_image}" alt="${event.name}" class="event-image">
          <div class="event-content">
            <div class="badges">
              <span class="badge department">${event.department}</span>
              <span class="badge category">${event.category}</span>
            </div>
            <div class="event-title">${event.name}</div>
            <div class="event-details">📅 ${event.date} | ⏰ ${event.time} | ⏳ ${event.duration} | 📍 ${event.location}</div>
            <div class="event-description">${event.description}</div>
            <div class="speakers">
              ${event.speakers.map(speaker => `
                <div class="speaker">
                  <img src="${speaker.photo}" alt="${speaker.name}">
                  <div class="speaker-details">
                  <div class="speaker-firstname">${speaker.firstname}</div>
                    <div class="speaker-name">${speaker.name}</div>
                    <div class="speaker-bio">${speaker.bio}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;

        if (event.date >= today) {
          upcomingContainer.appendChild(card);
        } else {
          pastContainer.appendChild(card);
        }
      });
    }

    loadEvents();

     function toggleMenu() {
      document.getElementById("navLinks").classList.toggle("active");
    }