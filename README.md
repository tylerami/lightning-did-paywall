# Lightning Paywall: Decentralized Paywalls for Content Creators

We aim to create a proof of concept for a decentralized paywall mechanism utilizing Decentralized Identifiers (DIDs) and the Lightning Network. The idea here is to give content creators (blogs, artists, authors, creators) the ability to paywall certain content without giving a cut to Google, Meta, Apple, or Patreon. The project will involve linking a Lightning Network URL (LNURL) to a DID, thereby creating a seamless payment channel for accessing hosted content on a user's Decentralized Web Node (DWN). 

## Table of Contents


- [Usage](#usage)
- [Features](#features)
- [Contribution Guidelines](#contribution-guidelines)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact Information](#contact-information)
- [Acknowledgements](#acknowledgements)


## Usage


## Features


This project uses the Web5 standard created by the [TBD team](https://developer.tbd.website/projects/web5/). This aims to put entities in control of their own identity and personal data, by having the entities host their own data on Decentralized Web Nodes (DWNs), public encrypted datastores.

We have built a simple protocol for building profiles on Web5, which contains basic information (username, profile picture, bios). These profiles are public and are accessible using a user's DID (Decentralized Identifier), a W3C international standard for identifiers created, owned, and controlled by individuals, without reliance on centralized entities. In the future we are looking to decouple this from the content protocol. 

The main problem we are solving is managing permissions between Decentralized Web Nodes: currently, in Web5 it is hard to grant permissions asynchronously (typically, the entity must grant the permissions with keys from their own wallet synchronously). Our paywall protocol allows for programmatic/async permissioning.

We use the Lightning Network, a second-layer protocol built on top of Blockchain technology that allows for fast and secure transactions that facilitates off-chain payment channels. Our protocol can then allow the app or DWN to grant permission to view content based on the status of a Lightning Invoice, and send Invoices to paywall content.

Currently, the web app holds the responsibility for validating lightning invoices. We would like the DWNs to validate the invoices in the future, because this decentralizes the power away from central parties like web apps and service providers. Instead, each entity would validate transactions through their own Node using an SDK/well-defined protocol.


## Contribution Guidelines


We are very open to contributions! Feel free to submit PRs building on top of the work we have already done. Please note: as of the moment this is a short 1-week old hackweek project, and doesn't have any formal procedures or protocols set up for submitting your contributions, so please keep that in mind when working on the codebase.

Additional note: Our frontend implemented with React is simply a proof-of-concept for a web app using our protocol to implement the decentralized paywalls. The power of the solution we provide is in the actual protocol for content monetization and should be agnostic of the implementation/frontend.


## Roadmap


For the future, we'd like to expand on our base implementation by:

- Removing the dependency on the alby tools SDK and validate invoices ourselves (e.g. by running our own Lightning Node in the browser and connecting to service providers)
- Setting up a configuration for entities that would like to use their own Lightning Node for validation.


## License


Copyright 2023 Block Inc.
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


## Contact Information

Feel free to get in touch! This project was originally created as a Block hackweek project and here are our contact info:

Ailany Rodriguez:
- [Linkedin](https://www.linkedin.com/in/ailany-rodriguez/)
- [Github](https://github.com/ai-lany)
- [Email](ailany@squareup.com)

Tyler Amirault:
- [Linkedin](https://www.linkedin.com/in/tyleramirault/)
- [Github](https://github.com/tylerami)
- [Email](tyleramirault@squareup.com)

Henry Li:
- [Linkedin](https://www.linkedin.com/in/henry-li-219a511b8/)
- [Github](https://github.com/yellowdragoon)
- [Email](henryli@squareup.com)


## Acknowledgements


We'd like to thank the following people for making this project possible:

- Daniel buchner
- Dianne Huxley
- Moe Jangda 
- Mic Neale 
- Ryan Loomba