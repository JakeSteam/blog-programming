---
title: A real-world comparison between Lenovo's ThinkBook 16p Gen 2 and 16p Gen 6 (with photos!)
image: /assets/images/banners/thinkbook-banner.jpg
tags:
  - Technology
  - Lenovo
  - Laptop
---

intro

## Disclaimer

Whilst the technical specifications and benchmarks are presented as fairly as possible, a laptop used daily for years is always going to have reduced performance! Despite closing any additional programs (e.g. Steam, WhatsApp), various _things_ are probably running in the background and using up system resources, in additional to the typical hardware wear and tear.

The new laptop was fully set up before I used it, meaning it's totally possible that a single misbehaving program (e.g. Lenovo Vantage, or Logi Options+) might be skewing the results. However, **the entire point is a _real-world_ comparison**, so I don't mind at all, hopefully you don't either!

## Specifications

Since I was intending to buy the mid-high spec ThinkBook 16p Gen 6 at full price, a 20% Black Friday discount meant I could purchase the max spec ThinkBook 16p Gen 6 instead!

|    Feature    |    ThinkBook 16p Gen 2    |     ThinkBook 16p Gen 6     | Improvement |
| :-----------: | :-----------------------: | :-------------------------: | :---------: |
| **Released**  |          Q1 2021          |           Q3 2025           |             |
|   **Cost**    | £989[^g2-price] (Mar '23) | £1,420[^g6-price] (Nov '25) |             |
| **CPU[^cpu]** |       Ryzen 7 5800H       |  Intel Core Ultra 9 275HX   |    +80%     |
| **GPU[^gpu]** |       RTX 3060 6GB        |        RTX 5060 8GB         |    +72%     |
|    **RAM**    |    16GB DDR4-3200MT/s     |     32GB DDR5-5600MT/s      |   >+250%    |
|  **Storage**  | 500GB SSD M.2 2280 PCIe 3 |   1TB SSD M.2 2242 PCIe 4   |    +200%    |
|  **Screen**   |    16" 2560x1600 60Hz     |     16" 3200x2000 165Hz     |    +56%     |
|  **Battery**  |           71Wh            |            85Wh             |    +20%     |
|  **Charger**  |           230W            |            300W             |    +30%     |
|    **USB**    |  2x USB-A, 2x USB-C 3.2   |    2x USB-A, 2x USB-C 4     |             |
| **Wireless**  |   Wi-Fi 6, Bluetooth 5    |   Wi-Fi 7, Bluetooth 5.4    |             |

[^cpu]: <https://cpu.userbenchmark.com/Compare/Intel-Core-Ultra-9-275HX-vs-AMD-Ryzen-7-5800H/m2389974vsm1442974>
[^gpu]: <https://gpu.userbenchmark.com/Compare/Nvidia-RTX-5060-Laptop-vs-Nvidia-RTX-3060-Laptop/m2416979vsm1452971>
[^g2-price]: Purchased 2 years after release, hence the discount.
[^g6-price]: Reduced from £1,850 for Black Friday, plus £45 student discount. Does not include the £108 in Lenovo Points.

## Benchmarks

### Benchmarking tools

|    Type     |       Benchmark       |                          ThinkBook 16p Gen 2                           |                           ThinkBook 16p Gen 6                            |  Improvement   |
| :---------: | :-------------------: | :--------------------------------------------------------------------: | :----------------------------------------------------------------------: | :------------: |
|   **SSD**   | CrystalDiskMark Read  |                            3591/2080/213/31                            |                             6607/3884/680/84                             |  +84% - +219%  |
|   **SSD**   | CrystalDiskMark Write |                             305/293/221/69                             |                            5855/2873/497/154                             | +123% - +1820% |
| **CPU+GPU** |    3DMark Time Spy    | **[6531](https://www.3dmark.com/3dm/146622984)** (CPU 7786, GPU: 6351) | **[11659](https://www.3dmark.com/3dm/146618011)** (CPU 16418, GPU 11092) |      +78%      |
| **CPU+GPU** |  3DMark Steel Nomad   |            **[1472](http://www.3dmark.com/3dm/146622441)**             |             **[2529](https://www.3dmark.com/3dm/146617213)**             |      +74%      |

Obviously these are just benchmarks, so aren't _necessarily_ reflective of actual improvements. Regardless, the numbers are impressive, and reflect 4 years of technological progress. The SSD improvement across reads and writes is startling, as I didn't know PCIe 3.0 -> PCIe 4.0 would make such a difference! I was mainly just looking forward to 1TB, since 500GB was getting a little cramped. Sequential writes apparently benefited most from the upgrade, with an absurd +1820%.

More realistic however are the 3DMark improvements, which should be fairly close to real world performance. Both widely used tests agree on a 70-80% improvement in performance, which is enough to go from an unstable FPS playing games at high quality at 4K resolution, to an actually enjoyable experience.

### Real world comparisons

|                    Benchmark                    |          ThinkBook 16p Gen 2           |                 ThinkBook 16p Gen 6                  | Improvement  |
| :---------------------------------------------: | :------------------------------------: | :--------------------------------------------------: | :----------: |
|           **Startup time[^startup]**            |               **41.12s**               |                      **17.39s**                      |     -58%     |
|     **Jekyll build time seconds[^jekyll]**      |    Cold: **21.50**, Warm: **12.52**    |            Cold: **7.45**, Warm: **4.37**            |     -65%     |
| **Forza Horizon 5 FPS[^fh5-method] (High, 4K)** | 55 (Sim: 159, Render: 98, GPU: **57**) | 60 (Sim 283, Render: 223, GPU **107**)[^fh5-results] | +78% - +127% |

In addition to the benchmarks, here's a time comparison for a few things I actually do day-to-day. Startup time, a programming-y task, and a gaming-y task. My anecdotal experience fron the very start was a clearly snappier and more responsive system, although a lot of this is of course due to just being a clean system.

The results are about as expected, with the key difference for me being doubled performance on high graphics at 4K resolution. Whilst time saving during tasks is good, the ability to actually play games in high quality is a far more immediate benefit!

[^jekyll]: When deploying locally, the main process is generating the posts themselves, which includes a "done in X.XX seconds." output. The first start is usually slower, with subsequent rebuilds (not incremental) being quicker. Incremental builds vary a lot depending on what has changed (and are 1-2 seconds), so would be hard to compare.
[^fh5-method]: High graphics preset, with all AI-y anti-aliasing turned off, at my monitor's native 4K resolution.
[^fh5-results]: I play with VSync enabled, but FH5 doesn't support my monitor's actual refresh rate (75) so it's locked to 60. As such, whilst the Gen 2 (at 99%+ GPU the entire time) 55 FPS is accurate, the Gen 6 (at 50-60% GPU) is closer to 105 FPS. In this scenario, "Sim" is the game simulation FPS, "Render" is the game rendering FPS, and "GPU" is how many frames the GPU is actually able to output, basically the frames per second.
[^startup]: Informally measured by recording time between pressing power button and Windows login screen appearing.

## Photos

Overall, the Gen 6 clearly feels both more modern and more premium. Edges tend to be sharper, there are far fewer curves, and it gives off a bit of a "Cybertruck" vibe. The position of the "ThinkBook" and "Lenovo" branding also seems to have swapped around, who knows why.

Additionally, the ports are better placed, ventilation seems significantly better, and there seems to be a heavy MacBook inspiration on the keyboard. It's clearly the same family of products, but reflects a few years of design improvements.

### Edges

In these photos, the Gen 2 is **on the bottom**, therefore the Gen 6 is **on the top**.

|   Side    |                                                                           Photo                                                                           |                                                                                                                                             Notes                                                                                                                                              |
| :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **Front** |    [![ThinkBook Gen 2 vs ThinkBook Gen 6 front view](/assets/images/2025/thinkbook-edges-1-thumbnail.jpg)](/assets/images/2025/thinkbook-edges-1.jpg)     |                                                                                                    The Gen 6 is notably "chunkier" here, along with the "Magic Bay"[^magic-bay] connector.                                                                                                     |
| **Back**  |     [![ThinkBook Gen 2 vs ThinkBook Gen 6 back view](/assets/images/2025/thinkbook-edges-2-thumbnail.jpg)](/assets/images/2025/thinkbook-edges-2.jpg)     | The Gen 6 is very different here, with absolutely massive air vents, and the very sensible decision to have an HDMI connector here instead of 2x USB, and move it further away from the proprietary power port since it was extremely easy to confuse them (they look identical at a glance!). |
| **Left**  |     [![ThinkBook Gen 2 vs ThinkBook Gen 6 left view](/assets/images/2025/thinkbook-edges-3-thumbnail.jpg)](/assets/images/2025/thinkbook-edges-3.jpg)     |                                        The Gen 6 has kind of "swapped" left and right, with the 3x USB-C & 2x USB-C ports now being entirely on the sides. Interestingly, the side vents have disappeared, presumably because of the giant rear vents.                                         |
| **Right** |    [![ThinkBook Gen 2 vs ThinkBook Gen 6 right view](/assets/images/2025/thinkbook-edges-4-thumbnail.jpg)](/assets/images/2025/thinkbook-edges-4.jpg)     |                                                                                                                                                                                                                                                                                                |
|  Front 2  | [![ThinkBook Gen 2 vs ThinkBook Gen 6 side by side view](/assets/images/2025/thinkbook-edges-5-thumbnail.jpg)](/assets/images/2025/thinkbook-edges-5.jpg) |                                         Side by side, the _chunky_ Gen 6 clearly has far more space for hardware inside! It is slightly elevated due to the "Magic Bay"[^magic-bay] keeping it off the table, but there's still a distinct difference.                                         |

[^magic-bay]: Lenovo's very underused [modular connector system](https://www.lenovoshowcase.com/popup/ces/accessories/magic_bay.html), with only a webcam, light, or light available, all of which could be used with a USB port instead!

### Top-down

In these photos, the Gen 2 is **on the left**, therefore the Gen 6 is **on the right**.

|         Scenario         |                                                                               Photo                                                                               |                                                                                                                                                                    Notes                                                                                                                                                                    |
| :----------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|         **Top**          |         [![ThinkBook Gen 2 vs ThinkBook Gen 6 top-down view](/assets/images/2025/thinkbook-top-1-thumbnail.jpg)](/assets/images/2025/thinkbook-top-1.jpg)         |                                                                                                                A fairly similar design (besides the branding swap), although as a running theme the Gen 6 looks more modern.                                                                                                                |
| **Top (Partially open)** | [![ThinkBook Gen 2 vs ThinkBook Gen 6 top-down view, partially open](/assets/images/2025/thinkbook-top-2-thumbnail.jpg)](/assets/images/2025/thinkbook-top-2.jpg) | The keyboard is mostly the same, but the clutter above the backspace has been replaced with a sensible Home / End / Delete / brackets, and additional Page Up / Down buttons have appeared next to the arrow keys. I don't use the keyboard much, but I approve of the utility keys replacing gimmicky shortcuts (except the Copilot key!). |
|   **Top (Fully open)**   |   [![ThinkBook Gen 2 vs ThinkBook Gen 6 top-down view, fully open](/assets/images/2025/thinkbook-top-3-thumbnail.jpg)](/assets/images/2025/thinkbook-top-3.jpg)   |                                                                                                                             No additional comments, note that the pattern in the speaker is just a reflection.                                                                                                                              |
|     **Normal view**      |     [![ThinkBook Gen 2 vs ThinkBook Gen 6 normal viewing angle](/assets/images/2025/thinkbook-top-4-thumbnail.jpg)](/assets/images/2025/thinkbook-top-4.jpg)      |                                                                                                                         The Gen 6 screen is noticeably higher (a bit better for posture), otherwise about the same.                                                                                                                         |
|        **Bottom**        |          [![ThinkBook Gen 2 vs ThinkBook Gen 6 bottom view](/assets/images/2025/thinkbook-top-5-thumbnail.jpg)](/assets/images/2025/thinkbook-top-5.jpg)          |                                                                                                      The Gen 6 footpads are noticeably larger, and the vent shape has changed. I would guess this is to avoid dust blocking the vents.                                                                                                      |

Not noticeable in these images is a small improvement to the webcam privacy shutter: It now "sticks" to either side via magnets! Previously it would freely slide, meaning it often ended up pointlessly half-covered.

### Mounted

This is only relevant to my under-desk mounting setup ([documented here](/improving-my-triple-monitor-dual-laptop-standing-desk/#after)), the Gen 6 is a _far_ better fit.

|                                                             ThinkBook 16p Gen 2                                                             |                                                             ThinkBook 16p Gen 6                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| [![ThinkBook Gen 2 underdesk mounting](/assets/images/2025/thinkbook-mounted-1-thumbnail.png)](/assets/images/2025/thinkbook-mounted-1.jpg) | [![ThinkBook Gen 6 underdesk mounting](/assets/images/2025/thinkbook-mounted-2-thumbnail.jpg)](/assets/images/2025/thinkbook-mounted-2.jpg) |

With the new laptop mounted the other way round (back facing outwards) purely for USB-C port access, I gained multiple other benefits!

- The laptop no longer pokes out a bit (very annoying!), although the power cable is still technically sticking out.
- The heat ventilation is drastically improved. Previously it vented out the bottom (fine), and the back / sides where only a small amount of space was available before the desk infrastructure, so overheating was common. Now, it vents entirely into the room uninterrupted.
- There is now a very accessible USB-A port next to where the USB-C monitors are connected, plus a couple more fairly accessible USB-A ports on the other side.

## Summary

## Tech specs

- Gen 2 tech spec: <https://psref.lenovo.com/syspool/Sys/PDF/ThinkBook/ThinkBook_16p_G2_ACH/ThinkBook_16p_G2_ACH_Spec.pdf>
- Gen 6 tech spec: <https://psref.lenovo.com/syspool/Sys/PDF/ThinkBook/ThinkBook_16p_G6_IAX/ThinkBook_16p_G6_IAX_Spec.pdf>

## Notes
