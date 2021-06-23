package com.virtualpairprogrammers.roombooking.rest;

import com.virtualpairprogrammers.roombooking.data.RoomRepository;
import com.virtualpairprogrammers.roombooking.model.entities.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RestRoomsController {
  @Autowired
  private RoomRepository roomRepository;

  @GetMapping
  public List<Room> getRooms() {
    return roomRepository.findAll();
  }

  @GetMapping("/{id}")
  public Room getRoomById(@PathVariable long id) {
    return roomRepository.findById(id).get();
  }

  @PostMapping
  public Room addRoom(@RequestBody Room room) {
    return roomRepository.save(room);
  }

  @PutMapping
  public Room updateroom(@RequestBody Room room) {
    return roomRepository.findById(room.getId()).map(existing -> {
      existing.setName(room.getName());
      existing.setLocation(room.getLocation());
      existing.setCapacities(room.getCapacities());
      return roomRepository.save(existing);
    }).orElseThrow(() -> new IllegalArgumentException("Room with ID=" + room.getId() + " not found"));
  }

  @DeleteMapping("/{id}")
  public void deleteById(@PathVariable long id) {
    roomRepository.deleteById(id);
  }
}
