local Dialog = ImportPackage("dialogui")
local _ = function(k, ...) return ImportPackage("i18n").t(GetPackageName(), k, ...) end

local wpObject
local wptaxi
local currentCallout

local calloutsUI = nil

function OnPackageStart()
	calloutsUI = CreateWebUI(0, 0, 0, 1, 60)
	LoadWebFile(calloutsUI, "http://asset/" .. GetPackageName() .. "/callouts/ui/index.html")
    SetWebAlignment(calloutsUI, 0, 0)
    SetWebAnchors(calloutsUI, 0, 0, 1, 1)
    SetWebVisibility(calloutsUI, WEB_HIDDEN)
end
AddEvent("OnPackageStart", OnPackageStart)

function OpeningCalloutMenu() 
    CallRemoteEvent("callouts:getlist")    
end
AddEvent("callouts:openingmenu", OpeningCalloutMenu)
AddRemoteEvent("callouts:openingmenu", OpeningCalloutMenu)

AddRemoteEvent("callouts:displaymenu", function(callouts)
    SetIgnoreLookInput(true)
    SetIgnoreMoveInput(true)
    ShowMouseCursor(true)
    SetInputMode(INPUT_GAMEANDUI)
    SetWebVisibility(calloutsUI, WEB_VISIBLE)
    
    ExecuteWebJS(calloutsUI, 'LoadCallouts('..json_encode(callouts)..');')
end)

AddRemoteEvent("callouts:updatelist", function(callouts)
    ExecuteWebJS(calloutsUI, 'LoadCallouts('..json_encode(callouts)..');')
end)

AddEvent("OnDialogSubmit", function(dialog, button, ...)
    local args = {...}
    if dialog == calloutsMenu then
        if button == 1 then
            if args[1] == "" then
                MakeErrorNotification(_("callout_please_choose_callout"))
                return
            end
            CallRemoteEvent("callouts:start", args[1])            
        end
    end
end)

function StopCurrentCallout()
    CallRemoteEvent("callouts:end", currentCallout)
end
AddEvent("callouts:stoppingcallout", StopCurrentCallout)

function CreateCallout(service, reason)
    CallRemoteEvent("callouts:create", service, reason)
end
AddEvent("callouts:new", CreateCallout)

function TakeCallout(calloutId)
    CallRemoteEvent("callouts:start", calloutId)
end
AddEvent("callouts:ui:take", TakeCallout)

function StopCallout(calloutId)
    CallRemoteEvent("callouts:end", calloutId)
end
AddEvent("callouts:ui:stop", StopCallout)

function CloseCallout(player)
    SetIgnoreLookInput(false)
    SetIgnoreMoveInput(false)
    ShowMouseCursor(false)
    SetInputMode(INPUT_GAME)
    SetWebVisibility(calloutsUI, WEB_HIDDEN)
    CallRemoteEvent("account:setplayernotbusy")
end
AddEvent("callouts:ui:close", CloseCallout)

AddRemoteEvent("callouts:createwp", function(target, x, y, z, label)
    if wpObject ~= nil then DestroyWaypoint(wpObject) end
    currentCallout = target
    wpObject = CreateWaypoint(x, y, z, tostring(label))

    CallEvent("UpdateCalloutDestination", x, y)
    
end)

AddRemoteEvent("callouts:cleanwp", function()
    currentCallout = nil
    if wpObject ~= nil then DestroyWaypoint(wpObject) end
    wpObject = nil

    CallEvent("ClearCalloutDestination")
end)


-- TAXI WAYPOINT

--[[AddRemoteEvent("callouts:createwptaxi", function(target, x, y, z, label)
    if wptaxi ~= nil then DestroyWaypoint(wptaxi) end
    currentCallout = target
    wptaxi = CreateWaypoint(x, y, z, tostring(label))
    StockWayptnID(target, wptaxi)
    CallEvent("UpdateCalloutDestination", x, y)
    
end)

AddRemoteEvent("callouts:destroywptaxi", function(waypt)
    currentCallout = nil
    if waypt ~= nil then DestroyWaypoint(waypt) end
        waypt = nil
    end
end)

function StockWayptnID(target, wptaxi)
    if wpObject ~= nil then
        waypt = wptaxi
        caller = target
    else
        CallRemoteEvent("DestroyWp", waypt, caller)
    end
end

AddEvent("OnPlayerStartEnterVehicle", function(vehicle, seat)
    if GetPlayerPropertyValue("Caller") then
        local vehicleID = GetVehicleModel(vehicle)
        if vehicleID == 2 then
            if seatId ~= 0 then
                StockWayptnID()
            end
        end
    end
end)]]
