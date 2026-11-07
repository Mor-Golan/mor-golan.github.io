---
layout: post
title: "Windows 11 OOBE: Password Only Sign In Restored Every PC Backup and Saved Credentials"
description: "Windows 11 setup let me skip the Authenticator prompt with only a password, then restore every PC backup and saved credentials with no alert."
permalink: /research/windows-11-oobe-password-backup-restore/
---

| | |
|---|---|
| Product | Windows 11 setup (Out of Box Experience, OOBE), Microsoft account sign in |
| Issue | A password alone unlocks every PC backup in the account, including saved credentials |
| Attacker needs | The victim's Microsoft account password and any Windows 11 device in setup mode |
| Reported to | Microsoft Security Response Center (MSRC), May 10, 2026 |
| Vendor response | By design, no CVE |

## Summary

I found that the Windows 11 setup wizard, the Out of Box Experience (OOBE) that runs on first boot, after a factory reset or when restoring a PC, offered a password option in place of the Authenticator number matching prompt my account normally shows.<br>
With only the password, setup listed every PC backup stored in the account and restored one of them, including Folders, Apps, Settings and Credentials, without asking for any further verification.<br>
The account owner received no email, push notification or security alert at any point.

My account did not have two step verification turned on.<br>
It used the Authenticator app as a passwordless sign in method, and for that setup Microsoft treats the password as a valid alternative.<br>
That is why MSRC classified the report as by design.<br>
The point of this writeup is what that single password unlocks during setup, and that the Authenticator prompt gives the impression of a protection it does not provide.

I tested this on my own Microsoft account and my own devices.

## What happens

1. Boot any Windows 11 device into OOBE, either a new installation or a factory reset.<br>
   It does not have to be the victim's hardware.
2. On "Unlock your Microsoft experience", click **Sign in** and enter the victim's Microsoft account email.
3. The "Check your Authenticator app" screen appears with a number to match.<br>
   Do not approve anything in the app.
4. Click **Other ways to sign in**, then choose **Use my password**.
5. Enter the password and click **Sign in**.<br>
   The sign in succeeds without any Authenticator approval.
6. Continue through setup.<br>
   OOBE asks to create a new Windows Hello PIN on the device, which gives the attacker persistent local sign in.
7. On "Select a device to restore from", every PC backup in the account is listed with its device name and last backup date.<br>
   In my test four backups from four of my devices were listed.
8. Select a backup and click **Continue**.<br>
   Windows restores Folders, Apps, Settings and Credentials from that backup with no additional verification.

It needs no tools and takes three clicks from the Authenticator screen.

## Impact

The Credentials category restores the contents of Windows Credential Manager: saved website passwords, Remote Desktop credentials, network share credentials and similar secrets stored on the backed up PC.<br>
Together with the restored folders and app settings, a single known password turns into a copy of the victim's PC on the attacker's own machine.

The device the attacker sets up also gets a new Windows Hello PIN, so the attacker keeps local access to it without the password.

Nothing in the flow told the account owner that it happened.<br>
There was no new sign in alert by email or push, even though the sign in came from a new device and did not use the Authenticator prompt the account normally shows.

## Why this matters

Several design choices combine here:

- **The prompt suggests protection that is not there.** A user who approves an Authenticator number at every sign in reasonably believes the account needs that approval.<br>
  During setup, the password alone was enough.
- **No risk checks on the password path.** There was no step up for a new device, an unknown IP address or an unusual location.
- **No notification.** The owner was not alerted when a new device signed in with only the password.
- **Privileged access right after sign in.** OOBE showed the full backup catalogue immediately, with no second confirmation.
- **Credentials included in the restore.** Saved credentials were restored without any extra confirmation.

## Microsoft's response

I reported the issue to MSRC on May 10, 2026 with the full steps and a video of the sign in and restore.<br>
Microsoft classified it as by design and did not assign a CVE.

When I went through setup again later, it required the Authenticator approval.<br>
I have since turned on two step verification, so I cannot say whether that or a change in setup closed the path for my account.

## How to protect yourself

- Turn on two step verification for your Microsoft account at account.microsoft.com under Security, Advanced security options.<br>
  An Authenticator prompt on its own does not mean your password is not enough.
- Use a long, unique password for your Microsoft account.<br>
  This chain starts with knowing the password.
- Where you can, make a passkey or a hardware security key your sign in method.
- Review recent sign in activity at account.microsoft.com under Security.
- Check what Windows Backup stores under Settings, Accounts, Windows Backup, and consider whether you want credentials included.

## Timeline

- 2026-05-10: Reported to MSRC.
- MSRC classified the report as by design.<br>
  No CVE was assigned.
- 2026-11-07: Published.
