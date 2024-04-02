var doctorsInfo = {
    "Dr. Juan": { specialty: "Cardiología", schedule: ['09:00', '10:00', '11:00'] },
    "Dra. María": { specialty: "Pediatría", schedule: ['14:00', '15:00', '16:00'] },
    "Dr. Roberto": { specialty: "Dermatología", schedule: ['10:00', '12:00', '14:00'] },
    "Dra. Laura": { specialty: "Ginecología", schedule: ['08:00', '10:00', '12:00'] },
    "Dr. Carlos": { specialty: "Oftalmología", schedule: ['13:00', '14:00', '15:00'] },
    "Dra. Ana": { specialty: "Psiquiatría", schedule: ['11:00', '13:00', '15:00'] },
    "Dr. Pedro": { specialty: "Traumatología", schedule: ['09:00', '10:00', '11:00'] },
    "Dra. Sofia": { specialty: "Nutrición", schedule: ['14:00', '15:00', '16:00'] },
    "Dr. Antonio": { specialty: "Endocrinología", schedule: ['12:00', '14:00', '16:00'] },
    "Dra. Carolina": { specialty: "Dentista", schedule: ['09:00', '11:00', '13:00'] }
};

function showDoctorProfile(name, specialty, schedule) {
    document.getElementById('doctor-name').innerText = name;
    document.getElementById('doctor-specialty').innerText = specialty;
    document.getElementById('doctor-schedule').innerText = schedule.join(', ');
    document.getElementById('doctor-profile').style.display = 'block';
    document.getElementById('appointment-form').style.display = 'block';
}

function scheduleAppointment() {
    var selectedDoctor = document.getElementById('doctor-name').innerText;
    var selectedDate = document.getElementById('date').value;
    var selectedTime = document.getElementById('time').value;

    var doctorSchedule = doctorsInfo[selectedDoctor].schedule;
    if (!doctorSchedule.includes(selectedTime)) {
        alert("Lo sentimos, esta hora no está disponible para programar una cita con el " + selectedDoctor);
        return;
    }

    alert("Cita programada para el " + selectedDate + " a las " + selectedTime + " con el " + selectedDoctor);
}
