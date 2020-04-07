package edu.pitt.api.neo4j.controller;

import edu.pitt.api.neo4j.domain.Accident;
import edu.pitt.api.neo4j.domain.User;
import edu.pitt.api.neo4j.repository.AccidentRepository;
import edu.pitt.api.neo4j.repository.AdminRepository;
import edu.pitt.api.neo4j.repository.UserRepository;
import edu.pitt.api.neo4j.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;


import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    AccidentRepository accidentRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    static Object getObject(Optional<User> admin, JwtTokenProvider jwtTokenProvider) {
        try {
            String token = jwtTokenProvider.createToken(admin.get());
            HashMap<String, Object> result = new HashMap<>();
            result.put("User", admin);
            result.put("token", token);
            return result;
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username/password supplied");
        }
    }

    @PostMapping("/login")
    public Object adminLogin(@RequestBody UserController.LoginBody body) {
        Optional<User> admin = userRepository.findOneByUsernameAndPassword(body.username, body.password);
        User Admin = adminRepository.findOneByUsernameAndPassword(body.username, body.password);

        if (!admin.isPresent()) {
            return ResponseEntity.badRequest().body("User username and password mismatch");
        }
        if (Admin == null || !Admin.getIsAdmin()) {
            return ResponseEntity.badRequest().body("You are not admin");
        }
        return getObject(admin, jwtTokenProvider);

    }

    @GetMapping("/allUsers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Iterable<User> getAllUser() {
        return userRepository.findAll();
    }

    @GetMapping("/allAccidents")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Accident> getRecent100Reports() {
        return accidentRepository.findFirst100OrderByStartTimeDesc();
    }

    @PutMapping("/{reportId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Accident updateByReportId(@PathVariable Long reportId, @RequestBody Accident accidents) {
        Accident oldAccident = accidentRepository.findOneById(reportId);
        if (oldAccident == null) {
            throw new RuntimeException("No report is found");
        } else {
            return accidentRepository.save(accidents);
        }
    }

    @DeleteMapping("/report/{reportId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteAccidentsById(@PathVariable Long reportId) {
        try {
            accidentRepository.deleteById(reportId);
        } catch (NullPointerException er) {
            throw new RuntimeException("No report is found");
        }
    }

    @DeleteMapping("/user/{username}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUserbyUsername(@PathVariable String username) {
        try {
            userRepository.deleteByUsername(username);
        } catch (NullPointerException er) {
            throw new RuntimeException("No report is found");
        }
    }
}
