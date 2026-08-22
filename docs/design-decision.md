# Design decision

Date: August 22, 2026

## Question

How should patients choose and open post-exam instructions on phones and computers?

## Decision

Use Variant B, "Clinical directory".

The examination list remains visible while the document area shows the selected PDF and its availability. On small screens, the list and document area appear in sequence.

## Rationale

This variant separates examination selection from document access and makes PDF availability explicit. It also allows the catalogue to grow without turning the page into a large card grid.

## Original prototype

Variants A, B, and C are preserved on the `prototype/ui-directions` branch at commit `9b6e0fb`.
