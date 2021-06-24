package com.virtualpairprogrammers.roombooking.rest;

import com.virtualpairprogrammers.roombooking.data.BookingRepository;
import com.virtualpairprogrammers.roombooking.model.entities.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class RestBookingsController {
  @Autowired
  private BookingRepository bookingRepository;

  @GetMapping
  public List<Booking> getBookings(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
    Date sqlDate = new Date(System.currentTimeMillis());
    if (date != null) {
      sqlDate = Date.valueOf(date);
    }
    return bookingRepository.findAllByDate(sqlDate);
  }

  @GetMapping("/{id}")
  public Booking getById(@PathVariable long id) {
    return bookingRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("booking with id=" + id + " not found"));
  }

  @DeleteMapping("/{id}")
  public void deleteBooking(@PathVariable long id) {
    bookingRepository.deleteById(id);
  }

  @PostMapping
  public Booking addBooking(@RequestBody Booking booking) {
    bookingRepository.save(booking);
    return booking;
  }

  @PutMapping
  public Booking updateBooking(@RequestBody Booking booking) {
    return bookingRepository.findById(booking.getId()).map(b -> {
      booking.setDate(booking.getDate());
      booking.setStartTime(booking.getStartTime());
      booking.setEndTime(booking.getEndTime());
      booking.setRoom(booking.getRoom());
      booking.setLayout(booking.getLayout());
      booking.setParticipants(booking.getParticipants());
      booking.setUser(booking.getUser());
      booking.setTitle(booking.getTitle());
      bookingRepository.save(booking);
      return booking;
    }).orElseThrow(() -> new IllegalArgumentException("Booking with id=" + booking.getId() + " not found"));
  }
}
