package com.phamhieu2106.quanlygiaidaubongdaBE.entity;

import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Role;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "user")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String userName;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
