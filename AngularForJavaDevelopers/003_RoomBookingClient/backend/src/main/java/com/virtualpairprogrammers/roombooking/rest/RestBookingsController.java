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
    if (date == null) {
      sqlDate = Date.valueOf(date);
    }
    return bookingRepository.findAllByDate(sqlDate);
  }

  @DeleteMapping("/{id}")
  public void deleteBooking(@PathVariable long id) {
    bookingRepository.deleteById(id);
  }
}
