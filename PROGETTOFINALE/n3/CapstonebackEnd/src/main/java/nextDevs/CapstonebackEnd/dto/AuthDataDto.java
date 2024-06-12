package it.nextdevs.EpicEnergyServices.dto;

import lombok.Data;

@Data
public class AuthDataDto {
    private String accessToken;
    private UserDataDto user;
}
