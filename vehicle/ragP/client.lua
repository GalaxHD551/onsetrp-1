-- Made with 🖤 By Bad
-- https://github.com/Bad57/ragP

AddEvent("OnPlayerStartExitVehicle", function(vehicle)
    if not GetVehiclePropertyValue(nearestCar, "locked") then
        local currentspeed = GetVehicleForwardSpeed(vehicle)
        CallRemoteEvent("RagdollPlayer", currentspeed,vehicle)
     end
end)
